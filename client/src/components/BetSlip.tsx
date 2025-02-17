import { useRef } from 'react'
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material'
import { SelectedBet, useBetStore } from '#client/stores/betStore'
import { useFetchEvents } from '#client/api/eventApi.ts'
import { usePlaceBet } from '#client/api/betApi'
import { Event } from '#root/types/eventTypes'
import { useUIStore } from '#client/stores/uiStore.ts'
import { useTranslation } from 'react-i18next'

const getSelectedOdd = (selectedBet: SelectedBet | null, events: Event[] | undefined) => {
	if (!selectedBet) return null
	const event = events?.find((e) => e.event_id === selectedBet.event_id)
	if (!event) return null

	const regex = /: (.*?) vs\.? (.*)/
	const match = event.event_name.match(regex)

	let oddName = ''
	switch (selectedBet.odd_id) {
		case 0:
			oddName = match ? match[1] : event.event_name
			break
		case 1:
			oddName = 'Draw'
			break
		case 2:
			oddName = match ? match[2] : event.event_name
			break
	}

	return {
		oddName,
		oddValue: event.odds[selectedBet.odd_id],
	}
}

const BetSlip = () => {
	const { data: events } = useFetchEvents()
	const placeBetMutation = usePlaceBet()
	const { selectedBet, stake, setStake } = useBetStore()
	const { loading, setLoading, setSnackbarText } = useUIStore()
	const { t } = useTranslation()

	const stakeInputRef = useRef<HTMLInputElement | null>(null)

	const { oddName, oddValue } = getSelectedOdd(selectedBet, events) || {}
	const totalProfit = oddValue && stake ? (parseFloat(stake) * oddValue!).toFixed(2) : '0.00'

	const handlePlaceBet = () => {
		if (!selectedBet || !stake || parseFloat(stake) <= 0) {
			stakeInputRef.current?.focus()
			return
		}

		setLoading(true)
		placeBetMutation.mutate({ event_id: selectedBet.event_id, amount: parseFloat(stake) }, {
			onSuccess: () => {
				setStake('')
				setSnackbarText(t('betSlip.betSuccess'))
			},
			onError: () => {
				setSnackbarText(t('betSlip.betError'))
			},
			onSettled: () => {
				setLoading(false)
			},
		})
	}

	return (
		<Box
			sx={{
				flex: 1,
				backgroundColor: 'background.paper',
				padding: 3,
				borderRadius: 2,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<Typography variant="h6" color="white" sx={{ mt: 2 }}>
				{t('betSlip.title')}
			</Typography>
			{selectedBet ? (
				<Box sx={{ width: '100%' }}>
					<Typography variant="h6" color="white" sx={{ textAlign: 'center' }}>
						{events?.find((e) => e.event_id === selectedBet.event_id)?.event_name}
					</Typography>
					<Typography variant="body1" color="secondary" sx={{ mt: 2, textAlign: 'center', fontWeight: 'bold' }}>
						{oddName}: {oddValue}
					</Typography>
					<TextField
						type="number"
						label={t('betSlip.stakeAmount')}
						variant="outlined"
						fullWidth
						inputRef={stakeInputRef}
						value={stake}
						onChange={(e) => {
							setStake(e.target.value)
						}}
						sx={{
							mt: 2,
							borderRadius: 1,
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderColor: 'gray', // Keep border color
								},
								'&:hover fieldset': {
									borderColor: 'secondary.main', // Hover effect
								},
								'&.Mui-focused fieldset': {
									borderColor: 'secondary.main', // Keep focus color
								},
							},
							'& label': {
								color: 'text.secondary', // Keep label color
							},
							'& .MuiInputLabel-root.Mui-focused': {
								color: 'secondary.main', // Label remains same when focused
							},
						}}
					/>
					<Typography variant="body1" color="text.primary" sx={{ mt: 3, textAlign: 'center' }}>
						{t('betSlip.estPayout')} <span>${totalProfit}</span>
					</Typography>
					<Button variant="contained" color="secondary"
									sx={{ mt: 3, width: '100%', fontWeight: 'bold', p: 1, fontSize: '1.1rem' }}
									onClick={handlePlaceBet}
									disabled={loading}>
						{loading ? <CircularProgress size={24} color="inherit" /> : t('betSlip.placeBet')}
					</Button>
				</Box>
			) : (
				<Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
					{t('betSlip.select')}
				</Typography>
			)}
		</Box>
	)
}

export default BetSlip