const mongoose = require('mongoose');
require('dotenv').config();
const { User } = require('./models');
const connectToDatabase = require('../connection');

const seedUsers = async () => {
    try {
        await connectToDatabase();

        await User.deleteMany({});

        await User.create({
            name: 'Kevin Jones',
            email: 'kevinjones@email.com',
            phone: '888-444-1010',
            password: 'poiuytrewq'
        });

        await User.create({
            name: 'John Smith',
            email: 'johnsmith@email.com',
            phone: '888-444-1010',
            password: 'poiuytrewq'
        });

        const users = await User.find();
        console.log('---- ALL USERS ----\n', users);

        mongoose.connection.close();
    } catch (error) {
        console.log('---- ERROR ----\n', error);
    }
};

seedUsers();

