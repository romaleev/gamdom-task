import { Router, Request, Response } from 'express'
import { logger, db } from '#server/app'
import { events } from '#server/db/schema'
import { eq } from 'drizzle-orm'
import { Event } from '#common/types'
import { eventSchema, idSchema } from '#common/validation/schemas'
import i18n from '#common/i18n'
import { validateRequest } from '#server/common/util'

const { t } = i18n
const router = Router()

/**
 * ✅ GET /api/events - Fetch all events
 */
router.get('/', async (_req: Request, res: Response) => {
	try {
		const allEvents: Event[] = await db.select().from(events)
		res.json(allEvents)
	} catch (err) {
		logger.error(err)
		res.status(500).json({ error: t('api.error') })
	}
})

/**
 * ✅ POST /api/events - Add a new event
 */
router.post('/', validateRequest('body', eventSchema), async (req: Request, res: Response) => {
	try {
		const { event_name, odds } = req.body

		const [newEvent] = await db
			.insert(events)
			.values({ event_name, odds })
			.returning({ event_id: events.event_id })

		res.status(201).json({ status: 'created', event_id: newEvent.event_id })
	} catch (err) {
		logger.error(err)
		res.status(500).json({ error: t('api.error') })
	}
})

/**
 * ✅ PUT /api/events/:id - Update an event
 */
router.put(
	'/:id',
	validateRequest('params', idSchema),
	validateRequest('body', eventSchema),
	async (req: Request, res: Response) => {
		try {
			const { id } = req.params
			const { event_name, odds } = req.body

			const [updatedEvent] = await db
				.update(events)
				.set({ event_name, odds })
				.where(eq(events.event_id, Number(id)))
				.returning({ event_id: events.event_id })

			if (!updatedEvent) {
				res.status(404).json({ error: t('api.notFound') })
				return
			}

			res.json({ status: 'updated', event_id: updatedEvent.event_id })
		} catch (err) {
			logger.error(err)
			res.status(500).json({ error: t('api.error') })
		}
	},
)

/**
 * ✅ DELETE /api/events/:id - Remove an event
 */
router.delete('/:id', validateRequest('params', idSchema), async (req: Request, res: Response) => {
	try {
		const { id } = req.params
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
