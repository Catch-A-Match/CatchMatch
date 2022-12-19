const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    Instagram: {
        type: String
    },
    Age: {
        type: Number
    },
    Gender: {
        type: String,
        enum: ['M', 'F', 'O'],
    },
    Abstract: {
        type: String,
        maxLength: 500
    },
    interests: {
        type: String,
        minLength: 3,
        maxLength: 10
    },
    zodiac: {
        type: String
    },
    pets: {
        type: String
    },
    company: {
        type: String
    },
    drinking: {
        type: Boolean
    },
    smoking: {
        type: Boolean
    },
    perfectdatequestion: {
        type: String,
        maxLength: 200
    },
    quote: {
        type: String,
        maxLength: 60
    }
});

module.exports.Profile = mongoose.model('Profile', profileSchema);