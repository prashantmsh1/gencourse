import { eq, and, gt, desc } from 'drizzle-orm';
import { db } from '../db';
import { dailyBounties, users, enrollments, courses } from '../db/schema';
import { generateBounties } from './gemini.service';

export async function getDailyBounties(userId: number) {
  try {
    const now = new Date();
    
    // Check for existing valid bounties
    const existing = await db
      .select()
      .from(dailyBounties)
      .where(
        and(
          eq(dailyBounties.userId, userId),
          gt(dailyBounties.expiresAt, now)
        )
      )
      .orderBy(desc(dailyBounties.generatedAt));

    if (existing.length >= 3) {
      return existing;
    }

    // Otherwise generate new ones
    return await refreshBounties(userId);
  } catch (error) {
    console.error('Error in getDailyBounties:', error);
    return [];
  }
}

export async function refreshBounties(userId: number) {
  try {
    // 1. Fetch user's courses
    const userEnrollments = await db
      .select({
        title: courses.title,
        description: courses.description
      })
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .where(eq(enrollments.userId, userId));

    // 2. Generate with Gemini
    const newBountyTemplates = await generateBounties(userEnrollments);

    // 3. Delete old ones
    await db.delete(dailyBounties).where(eq(dailyBounties.userId, userId));

    // 4. Save new ones
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 6); // 6 hour TTL

    const insertedBounties = [];
    for (const b of newBountyTemplates) {
      const [newBounty] = await db.insert(dailyBounties).values({
        userId,
        title: b.title,
        description: b.description,
        rewardType: b.rewardType,
        rewardAmount: b.rewardAmount,
        expiresAt,
        completed: 0
      }).returning();
      insertedBounties.push(newBounty);
    }

    return insertedBounties;
  } catch (error) {
    console.error('Error refreshing bounties:', error);
    return [];
  }
}

export async function completeBounty(userId: number, bountyId: number) {
  try {
    const [bounty] = await db
      .select()
      .from(dailyBounties)
      .where(eq(dailyBounties.id, bountyId))
      .limit(1);

    if (!bounty || bounty.completed) return null;

    // Mark as completed
    await db.update(dailyBounties)
      .set({ completed: 1 })
      .where(eq(dailyBounties.id, bountyId));

    // Award rewards
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (user) {
      const updates: any = {};
      if (bounty.rewardType === 'xp') updates.xp = user.xp + bounty.rewardAmount;
      if (bounty.rewardType === 'coins') updates.coins = user.coins + bounty.rewardAmount;
      // Gems logic could go here if added to schema
      
      await db.update(users).set(updates).where(eq(users.id, userId));
    }

    return bounty;
  } catch (error) {
    console.error('Error completing bounty:', error);
    return null;
  }
}
