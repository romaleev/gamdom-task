import { useEffect, useRef } from 'react'
import { Box, Typography, Button, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SelectedBet, useBetStore } from '#client/stores/betStore'
import { useFetchEvents } from '#client/api/eventApi'
import { usePlaceBet } from '#client/api/betApi'
import { EventOdds } from '#common/types'
import { useUIStore } from '#client/stores/uiStore'
import StakeInput from '#client/components/StakeInput.tsx'

const getSelectedOdd = (selectedBet: SelectedBet | null, events: EventOdds[] | undefined) => {
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

	useEffect(() => {
		if (selectedBet && stakeInputRef?.current) {
			stakeInputRef.current.focus() // ✅ Auto-focus input when bet is selected
		}
	}, [selectedBet])

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
					<Typography variant="h6" color="white" sx={{ textAlign: 'center' }} data-test={`betslip-event-name`}>
						{events?.find((e) => e.event_id === selectedBet.event_id)?.event_name}
					</Typography>
					<Typography variant="body1" color="secondary" sx={{ mt: 2, textAlign: 'center', fontWeight: 'bold' }}
											data-test={`betslip-event-stake`}>
						{oddName}: {oddValue}
					</Typography>
					<StakeInput ref={stakeInputRef} />
					<Typography variant="body1" color="text.primary" sx={{ mt: 3, textAlign: 'center' }}>
						{t('betSlip.estPayout')} <span>${totalProfit}</span>
					</Typography>
					<Button data-test={`betslip-place-bet`}
									variant="contained" color="secondary"
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