const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
    user1Id: {
        type: String,
        ref: 'user',
        required: true, 
    },
    user2Id: {
        type: String,
        ref: 'user',
        required: true
    },
    similarity: {
        type: Number,
        required: true
    }
});

module.exports.Match = mongoose.model('match', matchSchema);