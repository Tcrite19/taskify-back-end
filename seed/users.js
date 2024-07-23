const mongoose = require('mongoose');
require('dotenv').config();
const { User } = require('./models');
const connectToDatabase = require('../connection');

connectToDatabase();


User.create({
    name: 'Kevin Jones',
    email: 'kevinjones@email.com',
    phone: '888-444-1010',
    password: 'poiuytrewq'
})
.then(user => {
    console.log('---- NEW USER ----\n', user);
})
.catch(error => {
    console.log('---- ERROR CREATING USER ----\n', error);
})

User.create({
    name: 'John Smith',
    email: 'johnsmith@email.com',
    phone: '888-444-1010',
    password: 'poiuytrewq'
})
.then(user => {
    console.log('---- NEW USER ----\n', user);
})
.catch(error => {
    console.log('---- ERROR CREATING USER ----\n', error);
})

User.find({}).then(users => {
    console.log('---- ALL USERS ----\n', users);
})
.catch(error => {
    console.log('---- ERROR FINDING USERS ----\n', error);
})
