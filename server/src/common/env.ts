import dotenv from 'dotenv'

// warning: .env & .env.production kept in git for test purposes

dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' })

export const isDev = process.env.NODE_ENV === 'development'
export const port = process.env.PORT || 3000
export const postgresUser = process.env.POSTGRES_USER || ''
export const postgresPassword = process.env.POSTGRES_PASSWORD || ''
export const postgresDB = process.env.POSTGRES_DB || ''
export const postgresHost = process.env.POSTGRES_HOST || 'localhost'
export const postgresPort = process.env.POSTGRES_PORT || '5432'
export const dbURL = `postgres://${postgresUser}:${postgresPassword}@${postgresHost}:${postgresPort}/${postgresDB}`
export const eventsApi = process.env.EVENTS_API || '/api/events'
