import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import BetSlip from '#client/components/BetSlip'
import { SelectedBet, useBetStore } from '#client/stores/betStore'
import { useUIStore } from '#client/stores/uiStore'

// Mock the useBetStore hook
vi.mock('#client/stores/betStore.ts', () => ({
	useBetStore: vi.fn(() => ({
		selectedBet: null,
		stake: '3',
		setStake: vi.fn(),
	})),
}))

// Mock the useFetchEvents hook
vi.mock('#client/api/eventApi.ts', () => ({
	useFetchEvents: vi.fn(() => ({
		data: [
			{
				event_id: 1,
				event_name: 'Team A vs. Team B',
				odds: [1.5, 2.0, 2.5],
			},
		],
	})),
}))

// Mock the usePlaceBet hook
vi.mock('#client/api/betApi.ts', () => ({
	usePlaceBet: vi.fn(() => ({
		mutate: vi.fn(),
		isLoading: false,
		isError: false,
		isSuccess: false,
	})),
}))

// Mock the useUIStore hook
vi.mock('#client/stores/uiStore.ts', () => ({
	useUIStore: vi.fn(() => ({
		loading: false,
		setLoading: vi.fn(),
		setSnackbarText: vi.fn(),
	})),
}))

// Mock the useTranslation hook
vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => key, // Mock translation function
	}),
}))

describe('BetSlip Component', () => {
	beforeEach(() => {
		// Clear all mocks before each test
		vi.clearAllMocks()
	})

	it('renders the BetSlip component with no selected bet', () => {
		render(<BetSlip />)
		// Check if the "select" message is displayed
		expect(screen.getByText('betSlip.select')).toBeInTheDocument()
	})

	it('renders the BetSlip component with a selected bet', () => {
		// Mock the useBetStore hook to return a selected bet
		vi.mocked(useBetStore).mockReturnValueOnce({
			selectedBet: { event_id: 1, odd_id: 0 } as SelectedBet,
			stake: '',
		})

		render(<BetSlip />)

		// Check if the event name and odd are displayed
		expect(screen.getByText('Team A vs. Team B')).toBeInTheDocument()
		expect(
			screen.getByText((content) => content.includes('1.5')),
		).toBeInTheDocument()
	})

	it.only('updates the stake input and calculates the total profit', async () => {
		// Mock the useBetStore hook to return a selected bet
		vi.mocked(useBetStore).mockReturnValue({
			selectedBet: { event_id: 1, odd_id: 0 } as SelectedBet,
			stake: '10',
		})

		render(<BetSlip />)

		// Check if the stake input is updated
		const stakeInput = screen.getByLabelText('betSlip.stakeAmount') as HTMLInputElement
		expect(stakeInput.value).toBe('10')

		// Check if the total profit is calculated correctly
		expect(screen.getByText('$15.00')).toBeInTheDocument()
	})

	it('shows an error if the stake is invalid', () => {
		// Mock the useBetStore hook to return a selected bet
		vi.mocked(useBetStore).mockReturnValueOnce({
			selectedBet: { event_id: 1, odd_id: 0 } as SelectedBet,
			stake: '',
		})

		render(<BetSlip />)

		// Click the "Place Bet" button without entering a stake
		const placeBetButton = screen.getByText('betSlip.placeBet')
		fireEvent.click(placeBetButton)

		// Check if the stake input is focused
		const stakeInput = screen.getByLabelText('betSlip.stakeAmount')
		expect(stakeInput).toHaveFocus()
	})

	it('shows a loading spinner when placing a bet', () => {
		// Mock the useBetStore hook to return a selected bet and stake
		vi.mocked(useBetStore).mockReturnValueOnce({
			selectedBet: { event_id: 1, odd_id: 0 } as SelectedBet,
			stake: '10',
		})

		// Mock the useUIStore hook to return loading as true
		vi.mocked(useUIStore).mockReturnValueOnce({
			loading: true,
			setLoading: vi.fn(),
			setSnackbarText: vi.fn(),
		})

		render(<BetSlip />)

		// Check if the loading spinner is displayed
		expect(screen.getByRole('progressbar')).toBeInTheDocument()
	})
})