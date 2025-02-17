import { Box, CircularProgress, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useFetchEvents } from '#client/api/eventApi.ts'
import EventItem from '#client/components/EventItem.tsx'
import BetSlip from '#client/components/BetSlip.tsx'
import { useUIStore } from '#client/stores/uiStore.ts'
import SnackBar from '#client/components/SnackBar.tsx'

const EventPage = () => {
	const { data: events, isLoading, isError } = useFetchEvents()
	const { setSnackbarText } = useUIStore()
	const { t } = useTranslation()

	useEffect(() => {
		if (isError) setSnackbarText(t('eventList.loadError'))
	}, [isError])

	return (
		<Box
			sx={{
				display: 'flex',
				width: '100vw',
				height: '100vh',
				backgroundColor: 'background.default',
				color: 'text.primary',
				padding: 3,
				overflow: 'hidden',
				flexDirection: 'column',
			}}
		>
			<Typography variant="h4" align="center" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
				{t('eventList.title')}
			</Typography>
			<Box sx={{ display: 'flex', flex: 1 }}>
				{/* Events List */}
				<Box sx={{ flex: 3, overflowY: 'auto', paddingRight: 3, height: '100%' }}>
					{/* Headers */}
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							backgroundColor: 'background.paper',
							padding: 2,
							borderRadius: 2,
							marginBottom: 2,
							textAlign: 'center',
							color: 'text.secondary',
						}}
					>
						<Typography sx={{ flex: 2, pr: 3 }}>{t('eventList.headerMatch')}</Typography>
						<Typography sx={{ flex: 1, textAlign: 'center' }}>1</Typography>
						<Typography sx={{ flex: 1, textAlign: 'center' }}>x</Typography>
						<Typography sx={{ flex: 1, textAlign: 'center' }}>2</Typography>
					</Box>

					{/* Event Rows */}
					{isLoading ? (
						<CircularProgress sx={{ display: 'block', margin: 'auto' }} />
					) : (
						events?.map(event => <EventItem key={event.event_id} event={event} />)
					)}
				</Box>

				{/* Bet Slip */}
				<BetSlip />
			</Box>

			<SnackBar />
		</Box>
	)
}

export default EventPage