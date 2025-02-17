import { act } from '@testing-library/react'
import { useBetStore } from '#client/stores/betStore'

describe('Bet Store', () => {
	beforeEach(() => {
		// Reset Zustand store before each test
		act(() => {
			useBetStore.setState({
				selectedBet: null,
				stake: '',
				loading: false,
				snackbarText: '',
			})
		})
	})

	test('should initialize with default values', () => {
		const state = useBetStore.getState()
		expect(state.selectedBet).toBeNull()
		expect(state.stake).toBe('')
		expect(state.loading).toBe(false)
		expect(state.snackbarText).toBe('')
	})

	test('should set selected bet correctly', () => {
		act(() => {
			useBetStore.getState().setSelectedBet({ event_id: 1, odd_id: 0 })
		})
		expect(useBetStore.getState().selectedBet).toEqual({ event_id: 1, odd_id: 0 })
	})

	test('should clear selected bet when setting null', () => {
		act(() => {
			useBetStore.getState().setSelectedBet(null)
		})
		expect(useBetStore.getState().selectedBet).toBeNull()
	})

	test('should update stake correctly', () => {
		act(() => {
			useBetStore.getState().setStake('100')
		})
		expect(useBetStore.getState().stake).toBe('100')
	})

	test('should set loading state correctly', () => {
		act(() => {
			useBetStore.getState().setLoading(true)
		})
		expect(useBetStore.getState().loading).toBe(true)
	})

	test('should set snackbar message correctly', () => {
		act(() => {
			useBetStore.getState().setSnackbarText('Bet placed successfully!')
		})
		expect(useBetStore.getState().snackbarText).toBe('Bet placed successfully!')
	})
})
