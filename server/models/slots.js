const mongoose = require('mongoose');

const slotsSchema = new mongoose.Schema({
    startTime: {
        type:Date,
    },
    court: String,
    bookedBy: {
        type: String,
        default: ""
    },
});

module.exports = mongoose.model('slots', slotsSchema);