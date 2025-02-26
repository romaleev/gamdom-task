import { db } from '#server/app'
import { events } from '#server/db/schema'

const seedDB = async () => {
	console.log('🧹 Cleaning existing records...')
	await db.delete(events) // ✅ Clears the table before inserting new data
	await db.execute(`TRUNCATE TABLE "events" RESTART IDENTITY CASCADE;`)

	console.log('🌱 Seeding database...')
	await db.insert(events).values([
		{ event_name: 'Soccer: Team A vs. Team B', odds: [1.75, 3.2, 2.1] },
		{ event_name: 'Basketball: Team C vs. Team D', odds: [2.1, 2.8, 1.95] },
		{ event_name: 'Tennis: Player X vs. Player Y', odds: [1.9, 3.0, 2.2] },
		{ event_name: 'Baseball: Team E vs. Team F', odds: [1.5, 2.75, 2.0] },
		{ event_name: 'Boxing: Fighter G vs. Fighter H', odds: [2.3, 3.1, 1.8] },
	])

	console.log('✅ Database seeded successfully!')

	// ✅ Explicitly close the database connection
	if (db.$client) {
		await db.$client.end()
	}

	// ✅ Ensure process exits immediately after completion
	process.exit(0)
}

seedDB()
