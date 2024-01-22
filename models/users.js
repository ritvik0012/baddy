const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);