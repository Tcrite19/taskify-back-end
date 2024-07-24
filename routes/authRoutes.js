// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const SALT_LENGTH = 12;
// const { check, validationResult } = require('express-validator');




// router.get('/signup', (req, res) => {
//     res.render('signup');
// });

// router.get('/verify-token', (req, res) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         res.json({ decoded });
//     } catch (error) {
//         res.status(401).json({ error: 'Invalid token.' });
//     }
// });



// router.get('/signin', (req, res) => {
//     res.render('signin');
// });

// router.post('/signup', [
//     check('username').not().isEmpty(),
//     check('password').isLength({ min: 6 }),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//         const userInDatabase = await User.findOne({ username: req.body.username });
//         if (userInDatabase) {
//             return res.status(409).json({ error: "Username already taken." });
//         }
//         const user = await User.create({
//             username: req.body.username,
//             hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH),
//         });
//         const token = jwt.sign(
//             { username: user.username, _id: user._id },
//             process.env.JWT_SECRET  || "secret"
//         );
//         res.status(201).json({ user, token });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// module.exports = router;