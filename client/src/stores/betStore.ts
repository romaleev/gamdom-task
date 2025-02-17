import { create } from 'zustand'

export interface BetAmount {
	event_id: number
	amount: number
}

export type SelectedBet = {
	event_id: number
	odd_id: number
} | null

interface BetStore {
	selectedBet: SelectedBet
	setSelectedBet: (bet: SelectedBet) => void
	stake: string
	setStake: (amount: string) => void
	loading: boolean
	setLoading: (loading: boolean) => void
	snackbarText: string
	setSnackbarText: (text: string) => void
}

export const useBetStore = create<BetStore>((set) => ({
	selectedBet: null,
	setSelectedBet: (bet) => set({ selectedBet: bet }),
	stake: '',
	setStake: (amount) => set({ stake: amount }),
	loading: false,
	setLoading: (loading) => set({ loading: loading }),
	snackbarText: '',
	setSnackbarText: (text) => set({ snackbarText: text }),
}))
