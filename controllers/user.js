const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport-config');

const SALT_LENGTH = 12;

router.post('/signin', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
        const token = jwt.sign(
          { username: user.username, _id: user._id },
          process.env.JWT_SECRET
        );
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid username or password.' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/profile',
//     failureRedirect: '/auth/login',
//     successFlash: 'Welcome back to your account',
//     failureFlash: 'Either email or password is incorrect. Please try again'
// }), (req, res) => {
    
// });

//   router.post('/signup', async (req, res) => {
//     // create the phone number error, then we can address a solution 
//     // search for the email in database (unique)
//     try {
//        const findUser = await User.findOne({ email: req.body.email });
//        // if findUser is null, then we create user
//        if (!findUser) {
//         const newUser = await User.create({
//             name: req.body.name,
//             email: req.body.email,
//             // phone: req.body.phone,
//             password: req.body.password
//         });
//         // req.flash('success', `Welcome ${newUser.name}! Account created.`); come back too later
//         // authenticate the user via passport
//         console.log('----- NEW USER ----\n', newUser);
//         passport.authenticate('local', {
//             successFlash: `Welcome ${newUser.name}! Account created.`
//         })(req, res);

//        } else {
//         req.flash('error', 'Email already exists. Try another email');
//         res.redirect('/auth/signup');
//        }
//     } catch (error) {
//         console.log('----- ERROR IN SIGNUP POST ----', error);
//         if (error.errors.phone.name === 'ValidatorError') {
//             req.flash('error', 'Phone number needs be for in format XXX-XXX-XXXX');
//             res.redirect('/auth/signup');
//         }
//     }
// });


  router.post('/signup', async (req, res) => {
    try {
      const userInDatabase = await User.findOne({ username: req.body.username });
      if (userInDatabase) {
        return res.json({ error: 'Username already taken.' });
      }
      const user = await User.create({
        username: req.body.username,
        hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH),
      });
      const token = jwt.sign(
        { username: user.username, _id: user._id },
        process.env.JWT_SECRET
      );
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;