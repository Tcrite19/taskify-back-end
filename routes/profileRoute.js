const express = require('express');
const router = express.Router();
const Task = require('../models/Task');


router.get('/', async (req, res) => {
    try {
        const bookings = await Task.find({ userId: req.user._id });
        res.render('profile', { user: req.user, bookings: bookings });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;