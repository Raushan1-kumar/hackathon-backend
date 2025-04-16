const { GoogleGenerativeAI } = require("@google/generative-ai");


const dotenv = require('dotenv')

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.4,
  },
  systemInstruction: `
You are an expert AI health advisor. Your job is to return clear and simplified JSON recommendations based on the user's health profile.

🧠 IMPORTANT RULES:
- Only return a JSON object (no text, no explanations).
- Each key should map to one child: either an object or an array.
- Avoid nested or complex structures — keep it simple and clean.

👤 You will be given the following details:
- Age, Gender, Height, Weight
- BMI (you don't need to calculate it)
- Medical conditions
- Goal
- Sleep duration, Exercise routine
- Smoking/Alcohol use
- Mood
- Food habits

🎯 Based on this, respond with a JSON like this:
{
  "exercise": ["Light cardio 3x a week", "Stretching every morning", "..."],
  "food": ["More leafy greens", "Less sugar intake", "..."],
  "goodHabits": ["Drink 2L water daily", "Sleep before 11PM", "..."],
  "extras": ["Schedule a routine checkup every 6 months", "Practice deep breathing for stress relief", "..."]
}

Every suggestion should be personalized to the user's profile.
Do NOT return generic advice — all tips should reflect the user's lifestyle and goal.
NEVER include plain text outside the JSON.
`
,
});


const generateResult = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const responseText =  result.response.text(); 
    console.log("🔥 Raw AI Response:", responseText);

    const jsonResponse = JSON.parse(responseText);
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error("❌ Error parsing AI response:", error);
    return { text: "Error: Invalid response from AI." };
  }
};

module.exports= {
  generateResult
}