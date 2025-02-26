import { forwardRef } from 'react'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useBetStore } from '#client/stores/betStore.ts'

const StakeInput = forwardRef<HTMLInputElement>((_props, ref) => {
	const { stake, setStake } = useBetStore()
	const { t } = useTranslation()

	return (
		<TextField
			type="number"
			label={t('betSlip.stakeAmount')}
			variant="outlined"
			fullWidth
			inputRef={ref}
			onChange={(event) => {
				setStake(event?.target?.value)
			}}
			value={stake}
			InputProps={{
				inputProps: {
					'data-test': 'betslip-stake-amount', // ✅ Properly placed here
					min: 1, // Prevent negative values
					step: 1, // Ensure 2 decimal places
				},
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
	)
})

export default StakeInput