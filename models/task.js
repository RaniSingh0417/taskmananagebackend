const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskTitle: { type: String },
    taskDescription: { type: String },
    taskDueDate: { type: Date },
    taskStatus: { type: String, enum: ["To-Do", "In-Progress", "Completed"] },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("Tasks_Details", taskSchema);
module.exports = taskModel;
