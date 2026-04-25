import { eq, desc, and } from 'drizzle-orm';
import { db } from '../db';
import { courses, enrollments } from '../db/schema';

export async function getActiveEnrollment(userId: number) {
  try {
    const result = await db
      .select({
        enrollment: enrollments,
        course: courses,
      })
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .where(
        and(
          eq(enrollments.userId, userId),
          eq(enrollments.status, 'in_progress')
        )
      )
      .orderBy(desc(enrollments.updatedAt))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error('Error fetching active enrollment:', error);
    return null;
  }
}
