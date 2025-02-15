import { pgTable, serial, varchar, jsonb } from 'drizzle-orm/pg-core'

export const events = pgTable('events', {
	event_id: serial('event_id').primaryKey(),
	event_name: varchar('event_name', { length: 255 }).notNull(),
	odds: jsonb('odds').$type<number[]>().notNull(), // ✅ Store odds as a JSON array
})
