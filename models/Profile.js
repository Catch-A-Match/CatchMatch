const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: 'user'
    },
    Instagram: {
        type: String
    },
    DOB: {
        type: Date,
        required: true
    },
    sexualOrientation: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true,
    },
    Abstract: {
        type: String,
        maxLength: 500,
        required: true
    },
    interests: {
        type: String,
        minLength: 3,
        maxLength: 10,
        required: true
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
        type: Boolean,
        required: true
    },
    perfectdatequestion: {
        type: String,
        maxLength: 200
    },
    quote: {
        type: String,
        maxLength: 60,
        required: true
    },
    problemWithSmoking: {
        type: Boolean,
        required: true
    }
});

module.exports.Profile = mongoose.model('Profile', profileSchema);