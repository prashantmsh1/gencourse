import { eq, desc, and } from 'drizzle-orm';
import { db } from '../db';
import { courses, enrollments, chapters, subtopics, quizzes, subtopicProgress, users } from '../db/schema';
import { CourseContent } from './gemini.service';
import { addXpToUser } from './user.service';

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

export async function getAllActiveEnrollments(userId: number) {
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
      .orderBy(desc(enrollments.updatedAt));

    return result;
  } catch (error) {
    console.error('Error fetching all active enrollments:', error);
    return [];
  }
}

export async function createAICourse(userId: number, content: CourseContent, difficulty: string, thumbnailPrompt: string | null) {
  try {
    // Note: neon-http driver doesn't support db.transaction for now.
    // Performing sequential insertions.
    
    // 1. Insert course
    const [newCourse] = await db.insert(courses).values({
      title: content.title,
      description: content.description,
      totalChapters: content.chapters.length,
      xpReward: content.xpReward,
      coinReward: content.coinReward,
      difficulty: difficulty as any,
      category: content.category,
      thumbnail: thumbnailPrompt,
      generatedBy: 'ai',
      userId: userId,
    }).returning();

    // 2. Insert chapters, subtopics, and quizzes
    for (const ch of content.chapters) {
      const [newChapter] = await db.insert(chapters).values({
        courseId: newCourse.id,
        chapterNumber: ch.chapterNumber,
        title: ch.title,
        description: ch.description,
      }).returning();

      for (const st of ch.subtopics) {
        const [newSubtopic] = await db.insert(subtopics).values({
          chapterId: newChapter.id,
          subtopicNumber: st.subtopicNumber,
          title: st.title,
          content: st.content,
        }).returning();

        if (st.quiz) {
          await db.insert(quizzes).values({
            subtopicId: newSubtopic.id,
            question: st.quiz.question,
            options: JSON.stringify(st.quiz.options),
            correctAnswer: st.quiz.correctAnswer,
            explanation: st.quiz.explanation,
          });
        }
      }
    }

    // 3. Auto-enroll user
    await db.insert(enrollments).values({
      userId: userId,
      courseId: newCourse.id,
      currentChapter: 1,
      completedChapters: 0,
      status: 'in_progress',
    });

    return newCourse;
  } catch (error) {
    console.error('Error creating AI course:', error);
    throw error;
  }
}

export async function getCourseWithContent(courseId: number) {
  try {
    const course = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
    if (course.length === 0) return null;

    const courseChapters = await db.select().from(chapters).where(eq(chapters.courseId, courseId));
    
    const chaptersWithContent = await Promise.all(courseChapters.map(async (ch) => {
      const chapterSubtopics = await db.select().from(subtopics).where(eq(subtopics.chapterId, ch.id));
      return { ...ch, subtopics: chapterSubtopics };
    }));

    return { ...course[0], chapters: chaptersWithContent };
  } catch (error) {
    console.error('Error fetching course with content:', error);
    return null;
  }
}

export async function getSubtopicWithQuiz(subtopicId: number) {
  try {
    const subtopic = await db.select().from(subtopics).where(eq(subtopics.id, subtopicId)).limit(1);
    if (subtopic.length === 0) return null;

    const quiz = await db.select().from(quizzes).where(eq(quizzes.subtopicId, subtopicId)).limit(1);
    
    return {
      ...subtopic[0],
      quiz: quiz.length > 0 ? { ...quiz[0], options: JSON.parse(quiz[0].options) } : null
    };
  } catch (error) {
    console.error('Error fetching subtopic with quiz:', error);
    return null;
  }
}

export async function enrollInCourse(userId: number, courseId: number) {
  try {
    const [enrollment] = await db.insert(enrollments).values({
      userId,
      courseId,
      currentChapter: 1,
      completedChapters: 0,
      status: 'in_progress',
    }).returning();
    return enrollment;
  } catch (error) {
    console.error('Error enrolling in course:', error);
    return null;
  }
}

export async function completeSubtopic(userId: number, subtopicId: number, quizPassed: boolean) {
  try {
    // 1. Get subtopic and course info
    const subtopicData = await db
      .select({
        subtopic: subtopics,
        chapter: chapters,
        course: courses
      })
      .from(subtopics)
      .innerJoin(chapters, eq(subtopics.chapterId, chapters.id))
      .innerJoin(courses, eq(chapters.courseId, courses.id))
      .where(eq(subtopics.id, subtopicId))
      .limit(1);

    if (subtopicData.length === 0) return null;
    const { subtopic, chapter, course } = subtopicData[0];

    // 2. Update subtopic progress
    const existingProgress = await db
      .select()
      .from(subtopicProgress)
      .where(
        and(
          eq(subtopicProgress.userId, userId),
          eq(subtopicProgress.subtopicId, subtopicId)
        )
      )
      .limit(1);

    const isFirstTimeCompletion = existingProgress.length === 0 || existingProgress[0].completed === 0;

    if (existingProgress.length > 0) {
      await db
        .update(subtopicProgress)
        .set({
          completed: 1,
          quizPassed: quizPassed ? 1 : existingProgress[0].quizPassed,
          updatedAt: new Date()
        })
        .where(eq(subtopicProgress.id, existingProgress[0].id));
    } else {
      await db.insert(subtopicProgress).values({
        userId,
        subtopicId,
        courseId: course.id,
        chapterId: chapter.id,
        completed: 1,
        quizPassed: quizPassed ? 1 : 0
      });
    }

    // 3. Award XP if first time
    if (isFirstTimeCompletion) {
      let xpAward = 20; // Base subtopic XP
      if (quizPassed) xpAward += 30; // Quiz bonus
      await addXpToUser(userId, xpAward);
    }

    // 4. Check if chapter is complete
    const chapterSubtopics = await db.select().from(subtopics).where(eq(subtopics.chapterId, chapter.id));
    const completedSubtopics = await db
      .select()
      .from(subtopicProgress)
      .where(
        and(
          eq(subtopicProgress.userId, userId),
          eq(subtopicProgress.chapterId, chapter.id),
          eq(subtopicProgress.completed, 1)
        )
      );

    const isChapterComplete = completedSubtopics.length === chapterSubtopics.length;

    // 5. Update enrollment
    if (isChapterComplete) {
       // Check if this chapter was already completed
       const enrollment = await db
        .select()
        .from(enrollments)
        .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, course.id)))
        .limit(1);

       if (enrollment.length > 0 && enrollment[0].completedChapters < chapter.chapterNumber) {
          const isCourseComplete = chapter.chapterNumber === course.totalChapters;
          
          await db.update(enrollments)
            .set({
               completedChapters: chapter.chapterNumber,
               currentChapter: isCourseComplete ? chapter.chapterNumber : chapter.chapterNumber + 1,
               status: isCourseComplete ? 'completed' : 'in_progress',
               updatedAt: new Date()
            })
            .where(eq(enrollments.id, enrollment[0].id));

          // Chapter completion XP
          await addXpToUser(userId, 100);
       }
    }

    return { success: true, isChapterComplete };
  } catch (error) {
    console.error('Error completing subtopic:', error);
    return null;
  }
}

export async function getCourseProgress(userId: number, courseId: number) {
  try {
    const completedSubtopics = await db
      .select()
      .from(subtopicProgress)
      .where(
        and(
          eq(subtopicProgress.userId, userId),
          eq(subtopicProgress.courseId, courseId),
          eq(subtopicProgress.completed, 1)
        )
      );
    
    return completedSubtopics;
  } catch (error) {
    console.error('Error getting course progress:', error);
    return [];
  }
}
