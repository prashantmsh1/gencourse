import { eq, asc, lte, desc } from 'drizzle-orm';
import { db } from '../db';
import { users, levels } from '../db/schema';

export async function getLevels() {
  try {
    return await db
      .select()
      .from(levels)
      .orderBy(asc(levels.level));
  } catch (error) {
    console.error('Error fetching levels:', error);
    return [];
  }
}

export async function getLevelForXp(xp: number) {
  try {
    const result = await db
      .select()
      .from(levels)
      .where(lte(levels.xpRequired, xp))
      .orderBy(desc(levels.level))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error('Error calculating level for XP:', error);
    return null;
  }
}

export async function getUserProfile(clerkId: string) {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function syncUserToDatabase(clerkUser: any) {
  try {
    if (!clerkUser) return;

    const clerkId = clerkUser.id;
    const email = clerkUser.emailAddresses?.[0]?.emailAddress;
    const name = clerkUser.fullName || clerkUser.firstName || 'User';
    const imageUrl = clerkUser.imageUrl || '';

    if (!email || !clerkId) {
      console.warn('Missing email or clerkId for user synchronization');
      return;
    }

    // Check if user already exists
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId));

    if (existingUsers.length > 0) {
      // Update existing user if name or image changed
      const existingUser = existingUsers[0];
      if (existingUser.name !== name || existingUser.image_url !== imageUrl) {
        await db.update(users)
          .set({ name, image_url: imageUrl })
          .where(eq(users.clerkId, clerkId));
        console.log('Updated user profile data in database.');
      }
      return;
    }

    // Insert new user
    await db.insert(users).values({
      clerkId,
      email,
      name,
      image_url: imageUrl,
      xp: 0,
      coins: 0,
      level: 1,
      title: 'Nomad',
    });

    console.log('Successfully synchronized new user to database.');
  } catch (error) {
    console.error('Error synchronizing user to database:', error);
  }
}
