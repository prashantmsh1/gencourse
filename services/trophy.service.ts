import { eq, and } from 'drizzle-orm';
import { db } from '../db';
import { trophies, userTrophies } from '../db/schema';

export async function getAllTrophies() {
  try {
    return await db.select().from(trophies);
  } catch (error) {
    console.error('Error fetching all trophies:', error);
    return [];
  }
}

export async function getUserTrophies(userId: number) {
  try {
    const result = await db
      .select({
        id: trophies.id,
        title: trophies.title,
        description: trophies.description,
        requirement: trophies.requirement,
        icon: trophies.icon,
        earnedAt: userTrophies.earnedAt,
      })
      .from(userTrophies)
      .innerJoin(trophies, eq(userTrophies.trophyId, trophies.id))
      .where(eq(userTrophies.userId, userId));
    
    return result;
  } catch (error) {
    console.error('Error fetching user trophies:', error);
    return [];
  }
}

export async function earnTrophy(userId: number, trophyId: number) {
  try {
    // Check if already earned
    const existing = await db
      .select()
      .from(userTrophies)
      .where(and(eq(userTrophies.userId, userId), eq(userTrophies.trophyId, trophyId)))
      .limit(1);
    
    if (existing.length > 0) return existing[0];

    const result = await db.insert(userTrophies).values({
      userId,
      trophyId,
    }).returning();

    return result[0];
  } catch (error) {
    console.error('Error earning trophy:', error);
    return null;
  }
}
