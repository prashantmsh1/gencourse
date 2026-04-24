import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users } from '../db/schema';

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
      console.log('User already exists in the database. No action taken.');
      return;
    }

    // Insert new user
    await db.insert(users).values({
      clerkId,
      email,
      name,
      image_url: imageUrl,
    });

    console.log('Successfully synchronized new user to database.');
  } catch (error) {
    console.error('Error synchronizing user to database:', error);
  }
}
