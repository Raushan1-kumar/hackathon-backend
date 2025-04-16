const aiService = require("../service/ai.service")

const generate_healthylife_detail = async (req, res) => {

    if (!req.body) {
        return res.status(400).json({ success: false, message: "Missing request body" });
      }

    const {
        age,
        gender,
        height,
        weight,
        goal,
        conditions,
        sleep,
        exercise,
        smoking,
        mood,
        foodHabits
    } = req.body;

    // Calculate BMI
    const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);

    const prompt = `As an AI health assistant, please provide personalized health recommendations based on the following patient profile:

Personal Information:
- Age: ${age} years
- Gender: ${gender}
- Height: ${height} cm
- Weight: ${weight} kg
- BMI: ${bmi}

Health Status:
- Medical Conditions: ${conditions || 'None reported'}
- Current Health Goal: ${goal}

Lifestyle Factors:
- Sleep Pattern: ${sleep} hours per day
- Exercise Routine: ${exercise}
- Smoking Status: ${smoking ? 'Smoker' : 'Non-smoker'}
- Current Mood: ${mood}
- Dietary Habits: ${foodHabits}

Please provide:
1. A detailed analysis of current health status
2. Personalized recommendations for diet and exercise
3. Lifestyle modifications based on the health goal
4. Specific actions to improve overall wellbeing
5. Any potential health risks and preventive measures`;

    try {
       const response= await aiService.generateResult(prompt);
        return res.status(200).json({
            success: true,
            message: "Health recommendations generated successfully",
            data: response
        });
    } catch (error) {
        console.error('AI Generation Error:', error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate health recommendations"
        });
    }
};

module.exports = {
    generate_healthylife_detail
};