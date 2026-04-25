// Use require to ensure dotenv runs before any ESM imports are hoisted
// This is necessary because db/index.ts checks for the env var immediately
require('dotenv').config();

import { eq } from 'drizzle-orm';
import { db } from './index';
import { levels, courses, trophies } from './schema';

const initialLevels = [
  { level: 1, title: 'Nomad', xpRequired: 0, coinsRequired: 0, icon: 'tent' },
  { level: 2, title: 'Scout', xpRequired: 100, coinsRequired: 50, icon: 'tent' },
  { level: 3, title: 'Apprentice', xpRequired: 300, coinsRequired: 150, icon: 'tent' },
  { level: 4, title: 'Pathfinder', xpRequired: 600, coinsRequired: 300, icon: 'outpost' },
  { level: 5, title: 'Code Wizard', xpRequired: 1000, coinsRequired: 500, icon: 'outpost' },
  { level: 6, title: 'Battlemage', xpRequired: 1500, coinsRequired: 800, icon: 'outpost' },
  { level: 7, title: 'Archmage', xpRequired: 2200, coinsRequired: 1200, icon: 'fortress' },
  { level: 8, title: 'Warlord', xpRequired: 3000, coinsRequired: 1800, icon: 'fortress' },
  { level: 9, title: 'Lorekeeper', xpRequired: 4000, coinsRequired: 2500, icon: 'citadel' },
  { level: 10, title: 'Grandmaster', xpRequired: 5500, coinsRequired: 3500, icon: 'citadel' },
];

const initialCourses = [
  { 
    title: 'React Native Basics', 
    description: 'Learn the fundamentals of building cross-platform apps.', 
    totalChapters: 5, 
    xpReward: 250, 
    coinReward: 100, 
    icon: 'book' 
  },
  { 
    title: 'Advanced State Management', 
    description: 'Master Zustand, Redux, and Context API.', 
    totalChapters: 8, 
    xpReward: 500, 
    coinReward: 250, 
    icon: 'scroll' 
  },
  { 
    title: 'API Mastery', 
    description: 'Connect your apps to the world with REST and GraphQL.', 
    totalChapters: 6, 
    xpReward: 400, 
    coinReward: 200, 
    icon: 'map' 
  },
];

const initialTrophies = [
  { 
    title: '7-Day Streak', 
    description: 'Login for 7 consecutive days.', 
    requirement: 'Login 7 Days', 
    icon: 'fire' 
  },
  { 
    title: 'Night Owl', 
    description: 'Complete a quest after midnight.', 
    requirement: 'Midnight Quest', 
    icon: 'star' 
  },
  { 
    title: 'Perfect Score', 
    description: 'Get 100% on your first quiz.', 
    requirement: '100% Quiz', 
    icon: 'medal' 
  },
  { 
    title: 'Scholar', 
    description: 'Complete 5 courses.', 
    requirement: '5 Courses', 
    icon: 'trophy' 
  },
  { 
    title: 'Rich Nomad', 
    description: 'Earn 1000 coins.', 
    requirement: '1000 Coins', 
    icon: 'gem' 
  },
];

async function seed() {
  try {
    console.log('Seeding levels...');
    for (const l of initialLevels) {
      await db.insert(levels).values(l).onConflictDoUpdate({
        target: levels.level,
        set: {
          title: l.title,
          xpRequired: l.xpRequired,
          coinsRequired: l.coinsRequired,
          icon: l.icon,
        },
      });
    }
    console.log('Successfully seeded levels!');

    console.log('Seeding courses...');
    for (const c of initialCourses) {
      // For courses, we'll just check by title to avoid duplicates since we don't have a unique constraint yet
      // In a real app, you'd use a more robust check or a unique slug
      const existing = await db.select().from(courses).where(eq(courses.title, c.title)).limit(1);
      if (existing.length === 0) {
        await db.insert(courses).values(c);
      }
    }
    console.log('Successfully seeded courses!');
 
    console.log('Seeding trophies...');
    for (const t of initialTrophies) {
      const existing = await db.select().from(trophies).where(eq(trophies.title, t.title)).limit(1);
      if (existing.length === 0) {
        await db.insert(trophies).values(t);
      }
    }
    console.log('Successfully seeded trophies!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seed();
