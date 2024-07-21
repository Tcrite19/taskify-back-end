const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); 


// Endpoint to book a task
router.post('/', async (req, res) => {
  const { id } = req.body;
  console.log(' Task booked',  id);
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    if (task.booked) {
      return res.status(400).json({ error: 'Task is already booked' });
    }
    task.booked = true;
    await task.save();
    res.json(task);
    res.render('task booked', { task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

  module.exports = router;
