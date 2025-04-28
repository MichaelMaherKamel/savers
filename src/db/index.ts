import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// Create the client outside the function
const client = postgres(process.env.DATABASE_URL!)
// Initialize drizzle with the client
export const db = drizzle(client)