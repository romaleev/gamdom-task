import express from 'express'
import cors from 'cors'
import { dbURL, eventsApi } from '#server/common/env'
import pino from 'pino'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

import eventRoutes from '#server/routes/eventRoutes'

// ✅ Initialize Express & Logger
const app = express()

export const logger = pino({ transport: { target: 'pino-pretty' } })

const pool = new pg.Pool({ connectionString: dbURL })

export const db = drizzle(pool)

app.use(cors())
app.use(express.json())

// ✅ Use modular routes
app.use(eventsApi, eventRoutes)

export default app
