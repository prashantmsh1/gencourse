import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	clerkId: text("clerk_id").notNull().unique(),
	image_url: text("image_url").notNull(),
	xp: integer("xp").default(0).notNull(),
	coins: integer("coins").default(0).notNull(),
	level: integer("level").default(1).notNull(),
	title: text("title").default("Nomad").notNull(),
});
