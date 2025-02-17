import { Alert, Snackbar } from '@mui/material'
import { useUIStore } from '#client/stores/uiStore.ts'
import { useTranslation } from 'react-i18next'

const SnackBar = () => {
	const { snackbarText, setSnackbarText } = useUIStore()
	const { t } = useTranslation()

	return (
		<Snackbar open={!!snackbarText} autoHideDuration={3000} onClose={() => setSnackbarText('')}
							message={snackbarText} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
			<Alert
				icon={false}
				sx={{
					backgroundColor: snackbarText === t('betSlip.betSuccess') ? 'secondary.main' : 'error.main',
					color: 'black',
					fontWeight: 'bold',
					textAlign: 'center',
					width: '100%',
					minWidth: '300px',
					boxShadow: 4,
					borderRadius: 2,
					opacity: snackbarText ? 1 : 0
				}}
			>
				{snackbarText}
			</Alert>
		</Snackbar>
	)
}

export default SnackBar