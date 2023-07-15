const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task_Title: String,
  task_Description: String,
  task_Due_Date: Date,
  task_Status: String,
});

const taskModel = mongoose.model("Tasks_Details", taskSchema);
module.exports = taskModel;
