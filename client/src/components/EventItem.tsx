import { Card, CardContent, Typography, Box, Button } from '@mui/material'
import { useBetStore } from '#client/stores/betStore'
import { Event } from '#types/eventTypes'

interface EventListItemProps {
	event: Event
}

const EventItem = (props: EventListItemProps) => {
	const { event } = props

	if (!event) return null

	const { selectedBet, setSelectedBet } = useBetStore()

	const handleBetSelect = (odd_id: number) => {
		setSelectedBet(selectedBet?.event_id === event.event_id && selectedBet?.odd_id === odd_id ? null : {
			event_id: event.event_id,
			odd_id,
		})
	}

	return (
		<Card
			data-test={`event-${event.event_id}`}
			sx={{
				backgroundColor: 'background.paper',
				color: 'text.primary',
				marginTop: 3,
				padding: 2,
				display: 'flex',
				alignItems: 'center',
				borderRadius: 2,
			}}
			elevation={0}
		>
			<CardContent sx={{ flex: 2 }}>
				<Typography variant="h6" data-test={`event-name-${event.event_id}`}>{event.event_name}</Typography>
			</CardContent>
			<Box sx={{ display: 'flex', gap: '1.25em', flex: 3, mr: 1 }}>
				{event.odds.map((odd, index) => {
					const selected = selectedBet?.event_id === event.event_id && selectedBet.odd_id === index
					return (
						<Button
							data-test={`event-odd-${event.event_id}-${index}`}
							key={index}
							variant="contained"
							sx={{
								backgroundColor: selected ? 'secondary.main' : 'primary.main',
								color: selected ? 'black' : 'white',
								flex: 1,
								p: 1,
								fontWeight: 'bold',
								fontSize: '1.1rem',
								'&:hover': {
									color: selected ? 'black' : 'secondary.main',
								},
							}}
							onClick={() => handleBetSelect(index)}
						>
							{odd}
						</Button>
					)
				})}
			</Box>
		</Card>
	)
}

export default EventItem