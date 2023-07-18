const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task_Title: { type: String },
    task_Description: { type: String },
    task_Due_Date: { type: Date },
    task_Status: { type: String, enum: ["To-Do", "In-Progress", "Completed"] },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("Tasks_Details", taskSchema);
module.exports = taskModel;
