import { z } from 'zod'
import i18n from '#server/common/i18n'

const { t } = i18n

export const betSchema = z.object({
	stake: z
		.string()
		.min(0.01, t('betSchema.required'))
		.regex(/^\d+(\.\d{1,2})?$/, t('betSchema.invalidFormat'))
		.transform(Number)
		.refine(value => value > 0, t('betSchema.greaterZero')),

	eventId: z
		.number()
		.int()
		.positive(t('betSchema.invalidEventId')),
	oddId: z
		.number()
		.int()
		.min(0, t('betSchema.invalidOddId'))
		.max(2, t('betSchema.invalidOddId')),
})

export const eventSchema = z.object({
	event_name: z
		.string()
		.min(3, t('eventSchema.invalidName'))
		.max(255, t('eventSchema.invalidName')),
	odds: z
		.array(
			z.number()
				.positive()
		)
		.length(3, t('eventSchema.invalidOdds')),
})

export const idSchema = z.object({
	id: z.string().regex(/^\d+$/, t('betSchema.invalidEventId')),
})