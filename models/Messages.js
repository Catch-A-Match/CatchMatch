const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    sender: {
        type: String,
        ref: 'user'
    },
    recipient: {
        type: String,
        ref: 'user'
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports.Message = mongoose.model('message', messageSchema);