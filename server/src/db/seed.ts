import { db } from '#server/app'
import { events, odds } from '#server/db/schema'
import { Bet } from '#common/types'

const seedDB = async () => {
	console.log('🧹 Cleaning existing records...')
	await db.delete(odds) // ✅ First, clear odds table to avoid FK constraint issues
	await db.delete(events) // ✅ Clears events table
	await db.execute(`TRUNCATE TABLE "events" RESTART IDENTITY CASCADE;`)
	await db.execute(`TRUNCATE TABLE "odds" RESTART IDENTITY CASCADE;`)

	console.log('🌱 Seeding database...')

	// ✅ Insert events
	const insertedEvents = await db
		.insert(events)
		.values([
			{ event_name: 'Soccer: Team A vs. Team B' },
			{ event_name: 'Basketball: Team C vs. Team D' },
			{ event_name: 'Tennis: Player X vs. Player Y' },
			{ event_name: 'Baseball: Team E vs. Team F' },
			{ event_name: 'Boxing: Fighter G vs. Fighter H' },
		])
		.returning({ event_id: events.event_id }) // ✅ Get the event IDs

	// ✅ Insert odds using returned event IDs
	const eventOdds = [
		[1.75, 3.2, 2.1], // Soccer
		[2.1, 2.8, 1.95], // Basketball
		[1.9, 3.0, 2.2], // Tennis
		[1.5, 2.75, 2.0], // Baseball
		[2.3, 3.1, 1.8], // Boxing
	]

	const oddsData = insertedEvents.flatMap((event, index) =>
		eventOdds[index].map((odd_value, bet_type) => ({
			event_id: event.event_id,
			odd_value: odd_value.toString(),
			bet_type: bet_type as Bet, // 0 = Home, 1 = Draw, 2 = Away
		})),
	)

	await db.insert(odds).values(oddsData)

	console.log('✅ Database seeded successfully!')

	// ✅ Explicitly close the database connection
	if (db.$client) {
		await db.$client.end()
	}

	// ✅ Ensure process exits immediately after completion
	process.exit(0)
}

seedDB()
