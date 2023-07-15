const express = require("express");
const app = express();
const taskModel = require("./models/task");
const { connectDatabase } = require("./connection/file");
app.use(express.json());

app.post("/api/task", async (req, res) => {
  try {
    const newObject = {
      task_Title: req.body.title,
      task_Description: req.body.description,
      task_Due_Date: req.body.date,
      task_Status: req.body.status,
    };
    const taskData = new taskModel(newObject);
    await taskData.save();
    return res
      .status(200)
      .json({ success: true, message: "Data Saved Successfully" });
  } catch (error) {
    return res.status(401).json({ success: false, error: error.message });
  }
});

app.get("/task", async (req, res) => {
  try {
    const taskData = await taskModel.find();
    return res.status(200).json({ success: true, data: taskData });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

connectDatabase();
const PORT = 4000;
app.listen(PORT, async () => {
  await console.log(`Server is running at Port ${PORT}`);
});
