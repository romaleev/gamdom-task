import { Router, Request, Response } from 'express'
import { logger, db } from '#server/app'
import { events, odds } from '#server/db/schema'
import { eq } from 'drizzle-orm'
import { Event, EventOdds, Odd } from '#common/types'
import { eventSchema, idSchema } from '#common/validation/schemas'
import i18n from '#common/i18n'
import { validateRequest } from '#server/common/util'

const { t } = i18n
const router = Router()

/**
 * ✅ GET /api/events - Fetch all events with odds
 */
router.get('/', async (_req: Request, res: Response) => {
	try {
		const allEvents: Event[] = await db.select().from(events)

		// ✅ Explicitly fetch odds with proper table reference
		const allOdds: Odd[] = await db.select().from(odds)

		const eventsWithOdds: EventOdds[] = allEvents.map((event) => ({
			...event,
			odds: allOdds
				.filter((odd) => odd.event_id === event.event_id)
				.map(({ odd_value }) => Number(odd_value)),
		}))

		res.json(eventsWithOdds)
	} catch (err) {
		logger.error(err)
		res.status(500).json({ error: t('api.error') })
	}
})

/**
 * ✅ POST /api/events - Add a new event with odds
 */
router.post('/', validateRequest('body', eventSchema), async (req: Request, res: Response) => {
	try {
		const { event_name, odds: incomingOdds }: { event_name: string; odds: number[] } = req.body

		// ✅ Insert event
		const [newEvent] = await db
			.insert(events)
			.values({ event_name })
			.returning({ event_id: events.event_id })

		// ✅ Insert associated odds (correctly referenced)
		if (incomingOdds && Array.isArray(incomingOdds)) {
			const oddsToInsert = incomingOdds.map((odd_value, index) => ({
				event_id: newEvent.event_id,
				odd_value: odd_value.toString(),
				bet_type: index,
			}))

			await db.insert(odds).values(oddsToInsert)
		}

		res.status(201).json({ status: 'created', event_id: newEvent.event_id })
	} catch (err) {
		logger.error(err)
		res.status(500).json({ error: t('api.error') })
	}
})

/**
 * ✅ PUT /api/events/:id - Update an event and its odds
 */
router.put(
	'/:id',
	validateRequest('params', idSchema),
	validateRequest('body', eventSchema),
	async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const { event_name, odds: incomingOdds } = req.body

			// ✅ Update event name
			const [updatedEvent] = await db
				.update(events)
				.set({ event_name })
				.where(eq(events.event_id, Number(id)))
				.returning({ event_id: events.event_id })

			if (!updatedEvent) {
				res.status(404).json({ error: t('api.notFound') })
				return
			}

			// ✅ Correctly delete and insert odds
			if (incomingOdds && Array.isArray(incomingOdds)) {
				await db.delete(odds).where(eq(odds.event_id, Number(id))) // ✅ Delete existing odds

				const oddsToInsert = incomingOdds.map((odd_value, index) => ({
					event_id: updatedEvent.event_id,
					odd_value: odd_value.toString(),
					bet_type: index,
				}))

				await db.insert(odds).values(oddsToInsert)
			}

			res.json({ status: 'updated', event_id: updatedEvent.event_id })
		} catch (err) {
			logger.error(err)
			res.status(500).json({ error: t('api.error') })
		}
	},
)

/**
 * ✅ DELETE /api/events/:id - Remove an event (odds cascade deleted)
 */
router.delete('/:id', validateRequest('params', idSchema), async (req: Request, res: Response) => {
	try {
		const { id } = req.params

		// ✅ Ensure odds reference is correct before deletion
		const result = await db
			.delete(events)
			.where(eq(events.event_id, Number(id)))
			.returning({ event_id: events.event_id })

		if (result.length === 0) {
			res.status(404).json({ error: t('api.notFound') })
			return
		}

		res.json({ status: 'deleted', event_id: result[0].event_id })
	} catch (err) {
		logger.error(err)
		res.status(500).json({ error: t('api.error') })
	}
})

export default router
