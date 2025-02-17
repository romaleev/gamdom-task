import ky from 'ky'
import { useQuery } from '@tanstack/react-query'
import { Event } from '#root/types/eventTypes'

const API_URL = '/api/events'

const api = ky.create({ prefixUrl: API_URL })

/**
 * ✅ Fetch events
 */
export const useFetchEvents = () => {
	return useQuery<Event[]>({
		queryKey: ['events'],
		queryFn: async () => {
			return api.get('').json<Event[]>() // Ky automatically parses JSON
		},
		staleTime: 1000 * 60 * 5, // 5 minutes cache
	})
}
