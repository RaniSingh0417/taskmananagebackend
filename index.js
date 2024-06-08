const express = require("express");
const app = express();
const taskModel = require("./models/task");
const path = require("path");
const { connectDatabase } = require("./connection/file");
app.use(express.json());

app.post("/api/task", async (req, res) => {
  try {
    const newObject = {
      taskTitle: req.body.title,
      taskDescription: req.body.description,
      taskDueDate: req.body.date,
      taskStatus: req.body.status,
    };
    const taskData = new taskModel(newObject);
    await taskData.save();
    return res
      .status(200)
      .json({ success: true, message: "Task saved Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, error: error.message });
  }
});

app.get("/task", async (req, res) => {
  try {
    const taskData = await taskModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: taskData });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
//Update
app.put("/api/update/:id/:taskstatus", async (req, res) => {
  try {
    const taskupdate = await taskModel.findByIdAndUpdate(req.params.id, {
      taskStatus: req.params.taskstatus,
    });
    console.log(taskupdate);
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, error: error.message });
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  try {
    const task = await taskModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(404).json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;
connectDatabase();

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/client/build/index.html"),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.listen(PORT, async () => {
  await console.log(`Server is running at Port ${PORT}`);
});
