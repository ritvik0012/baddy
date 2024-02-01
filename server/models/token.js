const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    id: String,
    email: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

module.exports = mongoose.model('Token', tokenSchema);