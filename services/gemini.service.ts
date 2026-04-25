import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export interface BountyTemplate {
  title: string;
  description: string;
  rewardType: 'xp' | 'coins' | 'gems';
  rewardAmount: number;
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
    
    // Clean potential markdown backticks if AI included them
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
