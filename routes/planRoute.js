const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const { generateDayPlan } = require("../utils/geminiPlanner");

router.post("/", async (req, res) => {
  try {
    const tasks = await Task.find({
      taskStatus: { $in: ["To-Do", "In-Progress"] },
    });

    const plan = await generateDayPlan(tasks);
    res.json({ success: true, plan });
  } catch (error) {
    console.error("Plan Route Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
