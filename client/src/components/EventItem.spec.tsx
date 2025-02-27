import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import EventItem from '#client/components/EventItem'
import { useBetStore } from '#client/stores/betStore'
import { EventOdds } from '#common/types'

// Mock the useBetStore hook
vi.mock('#client/stores/betStore.ts', () => ({
	useBetStore: vi.fn(() => ({
		selectedBet: null,
		setSelectedBet: vi.fn(),
	})),
}))

describe('EventItem Component', () => {
	const mockEvent: EventOdds = {
		event_id: 1,
		event_name: 'Team A vs. Team B',
		odds: [2.0, 3.5, 1.8],
	}

	it('renders the event name correctly', () => {
		render(<EventItem event={mockEvent}
		/>)

		expect(screen.getByText('Team A vs. Team B')).toBeInTheDocument()
	})

	it('renders all odds buttons', () => {
		render(<EventItem event={mockEvent}
		/>)

		mockEvent.odds?.forEach((odd) => {
			expect(screen.getByText(odd.toString())).toBeInTheDocument()
		})
	})

	it('calls setSelectedBet on clicking an odd', () => {
		const setSelectedBetMock = vi.fn()

		vi.mocked(useBetStore).mockReturnValueOnce({
			selectedBet: null,
			setSelectedBet: setSelectedBetMock,
		})

		render(<EventItem event={mockEvent}
		/>)

		// Click on the first odd button
		fireEvent.click(screen.getByText('2'))

		// Expect setSelectedBet to have been called with the correct arguments
		expect(setSelectedBetMock).toHaveBeenCalledWith({
			event_id: 1,
			odd_id: 0,
		})
	})

	it('deselects the bet when clicking the same odd again', () => {
		const setSelectedBetMock = vi.fn()

		vi.mocked(useBetStore).mockReturnValueOnce({
			selectedBet: { event_id: 1, odd_id: 0 },
			setSelectedBet: setSelectedBetMock,
		})

		render(<EventItem event={mockEvent}
		/>)

		// Click on the first odd button again
		fireEvent.click(screen.getByText('2'))

		// Expect setSelectedBet to have been called with `null`
		expect(setSelectedBetMock).toHaveBeenCalledWith(null)
	})
})