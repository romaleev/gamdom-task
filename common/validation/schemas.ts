import { z } from 'zod'
import i18n from '#common/i18n'

const { t } = i18n

export const eventSchema = z.object({
  event_name: z
    .string()
    .min(3, t('eventSchema.invalidName'))
    .max(255, t('eventSchema.invalidName')),
  odds: z
    .array(
      z.number()
        .positive(),
    )
    .length(3, t('eventSchema.invalidOdds')),
})

export const idSchema = z.object({
  id: z.string().regex(/^\d+$/, t('betSchema.invalidEventId')),
})