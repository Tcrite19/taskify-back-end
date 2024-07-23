const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const isLoggedIn = require('../middleware/isLoggedIn');
const jwt = require('jsonwebtoken');



// add signup, login and 

router.get("/sign-token", (req, res) => {
    res.json({ message: "You are authorized!" });
  });

router.get('/signup', (req, res) => {
    res.json({ message: "You are signed in!" });

    res.render('signup');
});

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ username, email, passwordHash, firstName, lastName });
        await user.save();
        req.flash('success', 'You have successfully signed up!');
        res.redirect('/auth/login');
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out.');
        res.redirect('/');
    });
});

router.delete('/profile/delete', isLoggedIn, async (req, res) => {
    try {
        const userId = req.user._id;

        await User.findByIdAndDelete(userId);

        req.logout(function(err) {
            if (err) { return next(err); }
            req.flash('success', 'Your account has been deleted.');
            res.redirect('/');
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

