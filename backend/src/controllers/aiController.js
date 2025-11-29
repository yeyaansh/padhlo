import { GoogleGenAI } from "@google/genai";
export const aiProblemHint = async (req, res) => {
    const ai = new GoogleGenAI({});
  const { input } = req.body;
  console.log("input is : "+input)
  try {
    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: input,
        config: {
          systemInstruction: `You are an AI assistant that helps users solve coding and data-structures problems by giving useful hints only, not full solutions.
          
          When a user provides a problem, you must:
• Give short, clear hints that guide the user’s thinking.
• Avoid providing full code, full logic, or the exact final answer.
• Point out what concepts, data structures, patterns, or steps may help.
• Keep responses brief but meaningful.
• Encourage the user to think through the problem instead of solving it for them.

Do not reveal the exact algorithm, final code, or direct step-by-step solution.
Only provide hints that move the user in the right direction.
NOTE: Make sure to give the output in proper markdown language (in well formatted and organized way) and the ouput should be short.`,
        },
      });
      console.log(response.text);
      let result = response.text;
      if (result != null && result != "") {
        return res.status(200).send({
          status: true,
          result,
          message: "AI hint generated successfully...",
        });
      } else {
        return res.send({
          success: false,
          message:
            "Error while giving hint for the problem.. Please try later..",
        });
      }
    }

    await main();
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
