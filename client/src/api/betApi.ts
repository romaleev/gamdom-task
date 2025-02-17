import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BetAmount } from '#client/stores/betStore.ts'

/**
 * ✅ Place a bet (Fake API call)
 */
export const usePlaceBet = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (betAmount: BetAmount) => {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000))
			return betAmount
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['events'] })
		},
	})
}
