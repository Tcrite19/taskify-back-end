const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_LENGTH = 12;
const { check, validationResult } = require('express-validator');


router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/signin', (req, res) => {
    res.render('signin');
});

module.exports = router;