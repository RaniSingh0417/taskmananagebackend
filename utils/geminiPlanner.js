const useMock = process.env.USE_MOCK === "true";

if (useMock) {
  async function generateDayPlan(tasks) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const taskList = tasks
        .map(
          (task, index) =>
            `${index + 1}. ${
              task.taskTitle
            } - Due: ${task.taskDueDate.toDateString()}`
        )
        .join("\n");

      return `🧠 Gemini AI Mock Plan:\n\nTasks:\n${taskList}\n\nSuggested plan:\n- Start with the most urgent tasks.\n- Work in focused time blocks.\n- Don’t forget to take short breaks!`;
    } catch (error) {
      console.error("Gemini Planner Error (mock):", error.message);
      return "Unable to generate plan at this time.";
    }
  }

  module.exports = { generateDayPlan };
} else {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  require("dotenv").config();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  async function generateDayPlan(tasks) {
    const formattedTasks = tasks
      .map((task, index) => {
        return `${index + 1}. ${task.taskTitle} (Due: ${new Date(
          task.taskDueDate
        ).toDateString()}) - ${task.taskDescription}`;
      })
      .join("\n");

    const prompt = `
You are a smart AI daily planner. Based on the tasks and their deadlines below, create a prioritized and time-bound schedule for today:

Tasks:
${formattedTasks}

Make sure urgent or near-due tasks come first. Format the plan clearly using bullet points or time slots.
`;

    try {
      const model = genAI.getGenerativeModel({
        model: "models/gemini-1.5-pro",
      });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      return text;
    } catch (error) {
      console.error("Gemini Planner Error:", error.message);
      return "Unable to generate plan at this time.";
    }
  }

  module.exports = { generateDayPlan };
}
