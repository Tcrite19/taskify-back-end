const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
// const isLoggedIn = require('../middleware/isLoggedIn');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/address',(req, res) => {
    req.session.booking = { service: req.body.service };  
    res.render('bookingAddress', { service: req.body.service, user: req.user });
});

router.post('/book', async (req, res) => {
    try {
        const { street, city, state, areaCode, scheduleDate, price } = req.body;
        const address = `${street}, ${city}, ${state}, ${areaCode}`;
        
        const task = new Task({
            taskName: req.session.booking.service,
            description: `Booking for ${req.session.booking.service} at ${address}`,
            location: address,
            category: req.session.booking.service,
            date: new Date(scheduleDate), 
            userId: req.user._id,
            address: address,
            price: price,
            status: 'Pending' 
        });

        await task.save();
        req.flash('success', 'Booking appointment is complete!');
        res.redirect(`/booking/confirmation?taskId=${task._id}`);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/confirmation', async (req, res) => {
    try {
        const task = await Task.findById(req.query.taskId);
        res.render('bookingConfirmation', { task, user: req.user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/pay', async (req, res) => {
    try {
        const { taskId } = req.body;
        const task = await Task.findById(taskId);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: task.taskName,
                            description: task.description,
                        },
                        unit_amount: task.price * 100, 
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.protocol}://${req.get('host')}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.protocol}://${req.get('host')}/booking/cancel`,
            metadata: {
                taskId: task._id.toString() 
            }
        });

        res.redirect(303, session.url);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.get('/success', async (req, res) => {
    try {
        const sessionId = req.query.session_id;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const taskId = session.metadata.taskId;
        const task = await Task.findById(taskId);
        
        if (!task) {
            throw new Error('Task not found');
        }
        
        task.status = 'Paid';
        await task.save();

        res.render('bookingSuccess', { task, user: req.user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/cancel', (req, res) => {
    req.flash('error', 'Booking was cancelled.');
    res.redirect('/');
});

module.exports = router;
