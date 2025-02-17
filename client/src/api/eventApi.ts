import ky from 'ky'
import { useQuery } from '@tanstack/react-query'
import { Event } from '#types/eventTypes'

export const API_URL = '/api/events'

const api = ky.create({
	prefixUrl: API_URL,
	throwHttpErrors: true,
})

/**
 * ✅ Fetch events
 */
export const useFetchEvents = () => {
	return useQuery<Event[]>({
		queryKey: ['events'],
		queryFn: async () => {
			try {
				return await api.get('').json<Event[]>() // Ky auto-parses JSON
			} catch (error) {
				console.error('❌ Error fetching events:', error)
				throw new Error('Failed to fetch events') // Ensure React Query marks it as an error
			}
		},
		staleTime: 1000 * 60 * 5, // 5 min cache
		retry: false, // Disable retry if needed
	})
}
