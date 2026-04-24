import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

if (!process.env.EXPO_PUBLIC_DATABASE_URL) {
  throw new Error('EXPO_PUBLIC_DATABASE_URL environment variable is missing.');
}

export default defineConfig({
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.EXPO_PUBLIC_DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
