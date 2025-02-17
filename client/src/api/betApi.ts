import { useMutation, useQueryClient } from '@tanstack/react-query'

/**
 * ✅ Place a bet (Fake API call)
 */
export const usePlaceBet = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (betAmount: { event_id: number; amount: number }) => {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000))
			return betAmount
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['events'] })
		},
	})
}
