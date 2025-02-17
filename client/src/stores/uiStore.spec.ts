import { act } from '@testing-library/react'
import { useUIStore } from '#client/stores/uiStore'

describe('UI Store', () => {
	beforeEach(() => {
		// Reset Zustand store before each test
		act(() => {
			useUIStore.setState({
				loading: false,
				snackbarText: '',
			})
		})
	})

	test('should initialize with default values', () => {
		const state = useUIStore.getState()
		expect(state.loading).toBe(false)
		expect(state.snackbarText).toBe('')
	})

	test('should set loading state correctly', () => {
		act(() => {
			useUIStore.getState().setLoading(true)
		})
		expect(useUIStore.getState().loading).toBe(true)
	})

	test('should update snackbar text correctly', () => {
		act(() => {
			useUIStore.getState().setSnackbarText('An error occurred')
		})
		expect(useUIStore.getState().snackbarText).toBe('An error occurred')
	})
})
