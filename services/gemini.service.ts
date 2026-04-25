import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export interface BountyTemplate {
  title: string;
  description: string;
  rewardType: 'xp' | 'coins' | 'gems';
  rewardAmount: number;
}

export interface CourseContent {
  title: string;
  description: string;
  category: string;
  xpReward: number;
  coinReward: number;
  chapters: {
    chapterNumber: number;
    title: string;
    description: string;
    subtopics: {
      subtopicNumber: number;
      title: string;
      content: string;
      quiz: {
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
      };
    }[];
  }[];
}

export async function generateCourseContent(topic: string, difficulty: string): Promise<CourseContent | null> {
  try {
    if (!apiKey) return null;

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
      You are an expert educational AI designed to create high-quality, gamified learning courses for the "GenCourse" app.
      
      Topic: ${topic}
      Difficulty: ${difficulty} (Easy, Medium, Hard)
      
      Requirements:
      1. Generate exactly 8-10 chapters for the course.
      2. Each chapter must have exactly 5-6 subtopics.
      3. Each subtopic must have educational content (at least 200 words, use Markdown for formatting: bold, lists, etc.).
      4. Each subtopic must include exactly 1 quiz question (Multiple Choice, 4 options).
      5. The category must be one of: "Technical/Code", "General/Core", "Growth/AI", "Economics/Rare", "Secondary/Aux".
      6. XP Reward should be: Easy: 250, Medium: 500, Hard: 1000.
      7. Coin Reward should be: Easy: 100, Medium: 250, Hard: 500.
      
      IMPORTANT: Return ONLY a raw JSON object with the following structure:
      {
        "title": "Course Title",
        "description": "Short description",
        "category": "Category",
        "xpReward": number,
        "coinReward": number,
        "chapters": [
          {
            "chapterNumber": number,
            "title": "Chapter Title",
            "description": "Chapter description",
            "subtopics": [
              {
                "subtopicNumber": number,
                "title": "Subtopic Title",
                "content": "Markdown content...",
                "quiz": {
                  "question": "Question text",
                  "options": ["Option A", "Option B", "Option C", "Option D"],
                  "correctAnswer": number (0-3),
                  "explanation": "Why it's correct"
                }
              }
            ]
          }
        ]
      }
      
      Do not include markdown backticks or any other text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonString = text.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonString);

  } catch (error) {
    console.error("Error generating course content:", error);
    return null;
  }
}

export async function generateCourseThumbnail(courseTitle: string, category: string): Promise<string | null> {
  try {
    if (!apiKey) return null;

    const colorMap: Record<string, string> = {
      "General/Core": "Purple",
      "Technical/Code": "Cyan",
      "Growth/AI": "Emerald",
      "Economics/Rare": "Amber",
      "Secondary/Aux": "Indigo"
    };

    const accentColor = colorMap[category] || "Purple";
    
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-image-preview" });
    const prompt = `
      Based on the course title "${courseTitle}" and the category "${category}", identify a single iconic "Gamified Metaphor" (like a crystal, scroll, orb, or artifact) that represents this topic.
      Then, return ONLY a comma-separated list of keywords that can be used to generate a 3D isometric image of this asset.
      
      Style rules:
      - 3D Isometric, High-Gloss
      - Cinematic, volumetric lighting
      - Floating in a dark cinematic void (#0b0c15)
      - Neon ${accentColor} glows
      
      Example output: "glowing crystal circuit cube, technical code, 3D isometric, high-gloss, neon cyan glows, dark void background"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Error generating course thumbnail prompt:", error);
    return null;
  }
}

export async function generateBounties(enrolledCourses: any[]): Promise<BountyTemplate[]> {
  try {
    if (!apiKey) {
      console.warn("Gemini API Key missing, falling back to generic bounties");
      return getFallbackBounties();
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const coursesInfo = enrolledCourses.length > 0 
      ? enrolledCourses.map(c => `- ${c.title}: ${c.description}`).join('\n')
      : "No courses enrolled yet.";

    const prompt = `
      You are a gamification engine for a learning app called "GenCourse". 
      Generate exactly 3 daily bounties (short, actionable learning tasks) for the user.
      
      User's Enrolled Courses:
      ${coursesInfo}
      
      Rules:
      1. If the user has courses, 2 bounties should be specific to those courses (e.g. "Study [Topic] for 15 mins", "Practice [Concept]").
      2. 1 bounty should be more generic like "Explore a new topic" or "Maintain your streak".
      3. If NO courses are enrolled, generate 3 generic learning/engagement tasks like "Create your first course", "Explore the realms", or "Update your profile".
      4. Reward types must be one of: "xp", "coins", "gems".
      5. Reward amounts: 10-50 for XP, 20-100 for Coins, 1-2 for Gems.
      6. Keep titles under 40 characters.
      
      IMPORTANT: Return ONLY a raw JSON array of objects with keys: title, description, rewardType, rewardAmount. 
      Do not include markdown formatting or backticks.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonString = text.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonString);

  } catch (error) {
    console.error("Error generating bounties with Gemini:", error);
    return getFallbackBounties();
  }
}

function getFallbackBounties(): BountyTemplate[] {
  return [
    { title: 'Create a new course', description: 'Summon a quest to begin your journey', rewardType: 'coins', rewardAmount: 50 },
    { title: 'Explore a new realm', description: 'Browse available learning paths', rewardType: 'xp', rewardAmount: 20 },
    { title: 'Review your progress', description: 'Check your stats and achievements', rewardType: 'gems', rewardAmount: 1 },
  ];
}
