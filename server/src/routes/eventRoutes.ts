import { Router, Request, Response } from 'express'
import { logger, db } from '#server/app'
import { events } from '#server/db/schema'
import { eq } from 'drizzle-orm'
import { Event } from '#root/types/eventTypes'

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
		res.status(500).json({ error: 'Internal server error' })
	}
})

/**
 * ✅ POST /api/events - Add a new event
 */
router.post('/', async (req: Request, res: Response) => {
	try {
		const { event_name, odds } = req.body

		if (!event_name || !Array.isArray(odds) || odds.length !== 3) {
			res
				.status(400)
				.json({ error: 'Invalid input: Provide event_name and odds (array of 3 numbers)' })
			return
		}

		const [newEvent] = await db
			.insert(events)
			.values({ event_name, odds })
			.returning({ event_id: events.event_id })

		res.status(201).json({ status: 'created', event_id: newEvent.event_id })
	} catch (err) {
		logger.error(err)
		res.status(500).json({ error: 'Internal server error' })
	}
})

/**
 * ✅ PUT /api/events/:id - Update an event
 */
router.put('/:id', async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { event_name, odds } = req.body

		if (!event_name || !Array.isArray(odds) || odds.length !== 3) {
			res
				.status(400)
				.json({ error: 'Invalid input: Provide event_name and odds (array of 3 numbers)' })
			return
		}

		const [updatedEvent] = await db
			.update(events)
			.set({ event_name, odds })
			.where(eq(events.event_id, Number(id)))
			.returning({ event_id: events.event_id })

		if (!updatedEvent) {
			res.status(404).json({ error: 'Event not found' })
			return
		}

		res.json({ status: 'updated', event_id: updatedEvent.event_id })
	} catch (err) {
		logger.error(err)
		res.status(500).json({ error: 'Internal server error' })
	}
})

/**
 * ✅ DELETE /api/events/:id - Remove an event
 */
router.delete('/:id', async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const result = await db
			.delete(events)
			.where(eq(events.event_id, Number(id)))
			.returning({ event_id: events.event_id })

		if (result.length === 0) {
			res.status(404).json({ error: 'Event not found' })
			return
		}

		res.json({ status: 'deleted', event_id: result[0].event_id })
	} catch (err) {
		logger.error(err)
		res.status(500).json({ error: 'Internal server error' })
	}
})

export default router
