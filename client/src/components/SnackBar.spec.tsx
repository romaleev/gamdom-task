import { vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import SnackBar from '#client/components/SnackBar'
import { useUIStore } from '#client/stores/uiStore'

// Mock the useUIStore hook
vi.mock('#client/stores/uiStore.ts', () => ({
	useUIStore: vi.fn(() => ({
		snackbarText: 'Test Snackbar Message',
		setSnackbarText: vi.fn(),
	})),
}))

// Mock the useTranslation hook
vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => key, // Mock translation function
	}),
}))

describe('SnackBar Component', () => {
	it('renders the Snackbar with the correct message', () => {
		render(<SnackBar />)

		// Check if the Snackbar is rendered with the correct message
		expect(screen.getByText('Test Snackbar Message')).toBeInTheDocument()
	})

	it('renders the Snackbar with success styling when the message is a success', () => {
		// Mock the useUIStore hook to return a success message
		vi.mocked(useUIStore).mockReturnValueOnce({
			snackbarText: 'betSlip.betSuccess',
			setSnackbarText: vi.fn(),
		})

		render(<SnackBar />)

		// Check if the Alert component has the correct background color for success
		const alert = screen.getByRole('alert')
		expect(alert).toHaveStyle('backgroundColor: secondary.main')
	})

	it('renders the Snackbar with error styling when the message is not a success', () => {
		// Mock the useUIStore hook to return an error message
		vi.mocked(useUIStore).mockReturnValueOnce({
			snackbarText: 'Some error message',
			setSnackbarText: vi.fn(),
		})

		render(<SnackBar />)

		// Check if the Alert component has the correct background color for error
		const alert = screen.getByRole('alert')
		expect(alert).toHaveStyle('backgroundColor: error.main')
	})

	it('closes the Snackbar after the autoHideDuration', async () => {
		// Mock the setSnackbarText function
		const setSnackbarTextMock = vi.fn()
		vi.mocked(useUIStore).mockReturnValueOnce({
			snackbarText: 'Test Snackbar Message',
			setSnackbarText: setSnackbarTextMock,
		})

		render(<SnackBar />)

		// Wait for the Snackbar to close
		await waitFor(() => {
			expect(setSnackbarTextMock).toHaveBeenCalledWith('')
		}, { timeout: 3500 }) // Slightly longer than the autoHideDuration to ensure the timeout is triggered
	})
})