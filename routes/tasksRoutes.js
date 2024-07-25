const express = require("express");
const router = express.Router();
const { Task } = require("../models/");
const verifyToken = require("../middleware/verify-token");

router.get("/", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log("--- tasks:", tasks);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const task = new task({
    name: req.body.name,
    description: req.body.description,
    booked: req.body.booked,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.name = req.body.name;
    task.description = req.body.description;
    task.booked = req.body.booked;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const name = req.query.name;
    if (name) {
      const tasks = await Task.find({
        name: { $regex: new RegExp(name, "i") },
      });
      res.json(tasks);
    } else {
      const tasks = await Task.find();
      res.json(tasks);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
