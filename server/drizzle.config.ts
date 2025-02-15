import { defineConfig } from 'drizzle-kit'
import { dbURL } from '#server/common/env'

export default defineConfig({
	schema: './src/db/schema.ts',
	out: './migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: dbURL,
	},
})
