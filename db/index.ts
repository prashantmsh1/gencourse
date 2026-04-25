import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import * as dotenv from 'dotenv';

// Load environment variables for scripts
dotenv.config();

// Prevent connecting if EXPO_PUBLIC_DATABASE_URL is not set
if (!process.env.EXPO_PUBLIC_DATABASE_URL) {
  throw new Error('EXPO_PUBLIC_DATABASE_URL environment variable is required.');
}

const sql = neon(process.env.EXPO_PUBLIC_DATABASE_URL);
export const db = drizzle(sql, { schema });
