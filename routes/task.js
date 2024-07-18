const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// create a new task
router.post('/', auth, async (req, res) => {
    const { title, description, tasker } = req.body;
    try {
        const task = new Task({
            title,
            description,
            user: req.user.id,
            tasker
        });
        const savedTask = await task.save();
        res.json(savedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all tasks
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find().populate('user').populate('tasker');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a task by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user').populate('tasker');
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// update a task
router.put('/:id', auth, async (req, res) => {
    const { title, description, tasker, status } = req.body;
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.tasker = tasker || task.tasker;
        task.status = status || task.status;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        await task.remove();
        res.json({ msg: 'Task removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
