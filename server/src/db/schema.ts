import { pgTable, serial, varchar, integer, numeric, index } from 'drizzle-orm/pg-core'

// ✅ Events Table
export const events = pgTable(
	'events',
	{
		event_id: serial('event_id').primaryKey(),
		event_name: varchar('event_name', { length: 255 }).notNull(),
	},
	(event) => ({
		eventNameIndex: index('idx_event_name').on(event.event_name), // ✅ Index for faster event lookups
	}),
)

// ✅ Odds Table
export const odds = pgTable(
	'odds',
	{
		odd_id: serial('odd_id').primaryKey(),
		event_id: integer('event_id')
			.notNull()
			.references(() => events.event_id, { onDelete: 'cascade' }),
		odd_value: numeric('odd_value').notNull(),
		bet_type: integer('bet_type').notNull(),
	},
	(odd) => ({
		eventIdIndex: index('idx_event_id').on(odd.event_id), // ✅ Faster event filtering
		oddValueIndex: index('idx_odds_value').on(odd.odd_value), // ✅ Query optimization for odd value searches
	}),
)
