const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: false, unique: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: false }
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.hashedPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;