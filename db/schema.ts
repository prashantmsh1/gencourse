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
	next_level_up: integer("next_level_up").default(100).notNull(),
	is_paid: integer("is_paid").default(0).notNull(), // 0 for false, 1 for true
});

export const levels = pgTable("levels", {
	id: serial("id").primaryKey(),
	level: integer("level").notNull().unique(),
	title: text("title").notNull(),
	xpRequired: integer("xp_required").notNull(),
	coinsRequired: integer("coins_required").default(0).notNull(),
	icon: text("icon"),
});

export const courses = pgTable("courses", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	totalChapters: integer("total_chapters").notNull(),
	xpReward: integer("xp_reward").notNull(),
	coinReward: integer("coin_reward").notNull(),
	icon: text("icon"),
	difficulty: text("difficulty").default("medium").notNull(), // 'easy' | 'medium' | 'hard'
	thumbnail: text("thumbnail"), // URL or base64 of AI-generated thumbnail
	category: text("category"), // For thumbnail color-mapping
	generatedBy: text("generated_by").default("manual").notNull(), // 'ai' | 'manual'
	userId: integer("user_id"), // Who created this course
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chapters = pgTable("chapters", {
	id: serial("id").primaryKey(),
	courseId: integer("course_id").notNull(), // FK -> courses.id
	chapterNumber: integer("chapter_number").notNull(),
	title: text("title").notNull(),
	description: text("description"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subtopics = pgTable("subtopics", {
	id: serial("id").primaryKey(),
	chapterId: integer("chapter_id").notNull(), // FK -> chapters.id
	subtopicNumber: integer("subtopic_number").notNull(),
	title: text("title").notNull(),
	content: text("content").notNull(), // The actual learning content (markdown)
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizzes = pgTable("quizzes", {
	id: serial("id").primaryKey(),
	subtopicId: integer("subtopic_id").notNull(), // FK -> subtopics.id
	question: text("question").notNull(),
	options: text("options").notNull(), // JSON stringified array of 4 options
	correctAnswer: integer("correct_answer").notNull(), // Index (0-3) of correct option
	explanation: text("explanation"), // Why the answer is correct
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const enrollments = pgTable("enrollments", {
	id: serial("id").primaryKey(),
	userId: integer("user_id").notNull(),
	courseId: integer("course_id").notNull(),
	currentChapter: integer("current_chapter").default(1).notNull(),
	completedChapters: integer("completed_chapters").default(0).notNull(),
	status: text("status").default("in_progress").notNull(), // 'in_progress' or 'completed'
	enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const dailyBounties = pgTable("daily_bounties", {
	id: serial("id").primaryKey(),
	userId: integer("user_id").notNull(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	rewardType: text("reward_type").notNull(), // 'xp', 'coins', 'gems'
	rewardAmount: integer("reward_amount").notNull(),
	completed: integer("completed").default(0).notNull(), // 0 for false, 1 for true
	generatedAt: timestamp("generated_at").defaultNow().notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	courseId: integer("course_id"), // Optional FK to course
});

export const trophies = pgTable("trophies", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	requirement: text("requirement").notNull(), // e.g. "Reach Level 10"
	icon: text("icon").notNull(), // filename/key for the icon
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userTrophies = pgTable("user_trophies", {
	id: serial("id").primaryKey(),
	userId: integer("user_id").notNull(),
	trophyId: integer("trophy_id").notNull(),
	earnedAt: timestamp("earned_at").defaultNow().notNull(),
});

export const subtopicProgress = pgTable("subtopic_progress", {
	id: serial("id").primaryKey(),
	userId: integer("user_id").notNull(),
	subtopicId: integer("subtopic_id").notNull(),
	courseId: integer("course_id").notNull(),
	chapterId: integer("chapter_id").notNull(),
	completed: integer("completed").default(0).notNull(),
	quizPassed: integer("quiz_passed").default(0).notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
