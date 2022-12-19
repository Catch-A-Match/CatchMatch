const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports.Match = mongoose.model('match', matchSchema);