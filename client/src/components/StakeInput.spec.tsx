import { vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import StakeInput from '#client/components/StakeInput'
import { useBetStore } from '#client/stores/betStore'

// ✅ Mock the useBetStore hook
vi.mock('#client/stores/betStore.ts', () => ({
	useBetStore: vi.fn(() => ({
		stake: '',
		setStake: vi.fn(),
	})),
}))

// Mock the useTranslation hook
vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => key, // Mock translation function
	}),
}))

describe('StakeInput Component', () => {
	beforeEach(() => {
		// ✅ Clear all mocks before each test
		vi.clearAllMocks()
	})

	it('renders the StakeInput component correctly', () => {
		render(
			<StakeInput />,
		)

		// ✅ Verify input exists
		const stakeInput = screen.getByLabelText('betSlip.stakeAmount') as HTMLInputElement
		expect(stakeInput).toBeInTheDocument()
		expect(stakeInput.value).toBe('')
	})

	it('updates the stake input on user input', async () => {
		// ✅ Mock store with a function spy
		const setStakeMock = vi.fn()
		vi.mocked(useBetStore).mockReturnValueOnce({
			stake: '',
			setStake: setStakeMock,
		})

		render(
			<StakeInput />,
		)

		// ✅ Simulate user typing "10"
		const stakeInput = screen.getByLabelText('betSlip.stakeAmount') as HTMLInputElement
		fireEvent.change(stakeInput, { target: { value: '10' } })

		// ✅ Expect setStake to be called with correct value
		await waitFor(() => {
			expect(setStakeMock).toHaveBeenCalledWith('10')
		})
	})

	it('prevents entering non-numeric values', async () => {
		// ✅ Mock store with a function spy
		const setStakeMock = vi.fn()
		vi.mocked(useBetStore).mockReturnValueOnce({
			stake: '',
			setStake: setStakeMock,
		})

		render(
			<StakeInput />,
		)

		// ✅ Simulate entering non-numeric characters
		const stakeInput = screen.getByLabelText('betSlip.stakeAmount') as HTMLInputElement
		fireEvent.change(stakeInput, { target: { value: 'abc' } })

		// ✅ Ensure setStake is NOT called
		await waitFor(() => {
			expect(setStakeMock).not.toHaveBeenCalled()
		})
	})
})