const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Add Task
router.post('/add', authenticate, async (req, res) => {
    const { title, priority, description, status, deadline } = req.body;
    const validStatuses = ['toDo', 'inProgress', 'underReview', 'finished'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status provided' });
    }

    try {
        const task = new Task({ title, priority, description, status, deadline, user: req.user._id });
        await task.save();

        req.user.tasks[status].push(task._id);
        await req.user.save();

        res.status(201).json({task});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Tasks by Status
router.get('/:status', authenticate, async (req, res) => {
    const { status } = req.params;
    const validStatuses = ['toDo', 'inProgress', 'underReview', 'finished'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status provided' });
    }

    try {
        const tasks = req.user.tasks[status];

        if (!Array.isArray(tasks)) {
            return res.status(400).json({ error: 'Tasks data is corrupted or not an array' });
        }

        res.json(tasks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Tasks 
router.get('/login/all', authenticate, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });

        if (!tasks) {
            return res.status(404).json({ error: 'No tasks found for this user' });
        }

        res.json(tasks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Drag and drop
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });

        if (updatedTask) {
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


module.exports = router;
