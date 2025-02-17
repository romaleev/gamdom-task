import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#1E2328',
			paper: '#0C1118',
		},
		primary: {
			main: '#1f2227',
		},
		secondary: {
			main: '#75FB92',
		},
		text: {
			primary: '#FFFFFF',
			secondary: '#a3a3a3',
		},
	},
	typography: {
		fontFamily: 'Arial, sans-serif',
		h1: {
			fontSize: '2rem',
			fontWeight: 600,
			color: '#e0e0e0',
		},
		body1: {
			fontSize: '1rem',
			color: '#e0e0e0',
		},
		body2: {
			fontSize: '0.875rem',
			color: '#a3a3a3',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontSize: '0.875rem',
					borderRadius: 8,
				},
			},
		},
	},
})

export default darkTheme
