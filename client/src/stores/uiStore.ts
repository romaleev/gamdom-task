import { create } from 'zustand'

interface UIStore {
	loading: boolean
	setLoading: (loading: boolean) => void
	snackbarText: string
	setSnackbarText: (text: string) => void
}

export const useUIStore = create<UIStore>((set) => ({
	loading: false,
	setLoading: (loading) => set({ loading: loading }),
	snackbarText: '',
	setSnackbarText: (text) => set({ snackbarText: text }),
}))
