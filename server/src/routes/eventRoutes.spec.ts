import { eq } from 'drizzle-orm'
import request from 'supertest'
import app from '#server/app'
import { db } from '#server/app'
import { events, odds } from '#server/db/schema'
import { Event } from '#common/types'
import i18n from '#common/i18n'
import { eventsApi } from '#server/common/env'

const { t } = i18n

let event_id: number

describe('🎯 Events API Tests', () => {
	afterAll(async () => {
		await db.$client.end()
	})

	/**
	 * ✅ Test: Create an event
	 */
	it('should create a new event and return its ID', async () => {
		const res = await request(app)
			.post(eventsApi)
			.send({
				event_name: 'Test Event',
				odds: [1.5, 3.2, 2.8],
			})

		expect(res.status).toBe(201)
		expect(res.body).toEqual({
			status: 'created',
			event_id: expect.any(Number),
		})

		event_id = parseInt(res.body.event_id)

		// Validate database entry
		const createdEvent = await db
			.select()
			.from(events)
			.where(eq(events.event_id, res.body.event_id))
		expect(createdEvent[0].event_name).toBe('Test Event')

		const storedOdds = await db.select().from(odds).where(eq(odds.event_id, event_id))
		expect(storedOdds.length).toBe(3)
		expect(storedOdds.map((o) => Number(o.odd_value))).toEqual([1.5, 3.2, 2.8])
	})

	/**
	 * ✅ Test: Get all events
	 */
	it('should fetch all events', async () => {
		const res = await request(app).get(eventsApi)

		expect(res.status).toBe(200)
		expect(Array.isArray(res.body)).toBeTruthy()
		expect(res.body.find((event: Event) => event.event_id === event_id)).toBeTruthy()
	})

	/**
	 * ✅ Test: Update an event
	 */
	it('should update an existing event and return its ID', async () => {
		const res = await request(app)
			.put(`${eventsApi}/${event_id}`)
			.send({
				event_name: 'Updated Event Name',
				odds: [2.0, 3.0, 1.8],
			})

		// expect(res.status).toBe(200)
		expect(res.body).toEqual({
			status: 'updated',
			event_id,
		})

		// Validate database update
		const updatedEvent = await db.select().from(events).where(eq(events.event_id, event_id))
		expect(updatedEvent[0].event_name).toBe('Updated Event Name')

		const storedOdds = await db.select().from(odds).where(eq(odds.event_id, event_id))
		expect(storedOdds.length).toBe(3)
		expect(storedOdds.map((o) => Number(o.odd_value))).toEqual([2.0, 3.0, 1.8])
	})

	/**
	 * ✅ Test: Delete an event
	 */
	it('should delete an event and return its ID', async () => {
		const res = await request(app).delete(`${eventsApi}/${event_id}`)
		expect(res.status).toBe(200)
		expect(res.body).toEqual({
			status: 'deleted',
			event_id,
		})

		// Validate deletion
		const deletedEvent = await db.select().from(events).where(eq(events.event_id, event_id))
		expect(deletedEvent.length).toBe(0)
	})

	/**
	 * ❌ Test: Handle missing event deletion
	 */
	it('should return 404 for deleting a non-existent event', async () => {
		const res = await request(app).delete(`${eventsApi}/9999`)
		expect(res.status).toBe(404)
		expect(res.body).toEqual({ error: t('api.notFound') })
	})
})
