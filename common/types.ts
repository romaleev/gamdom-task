import { z } from 'zod'
import { betSchema } from '#common/validation/schemas'

export interface Event {
	event_id: number
	event_name: string
	odds: number[]
}

export type BetFormData = z.infer<typeof betSchema>