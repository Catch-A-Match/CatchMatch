const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
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
    Interests: {
        type: String,
        minLength: 3,
        maxLength: 10
    },
    Zodiac: {
        type: String
    },
    Pets: {
        type: String
    },
    Company: {
        type: String
    },
    Drinking: {
        type: Boolean
    },
    Smoking: {
        type: Boolean
    },
    PerfectDateQuestion: {
        type: String,
        maxLength: 200
    },
    Quote: {
        type: String,
        maxLength: 60
    }
}, { timestamps: true });

userSchema.methods.generateJWT = function() {
    const token = jwt.sign({
        _id: this._id,
        number: this.number
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
    // Return only token
    return token;
}

module.exports.User = mongoose.model('User', userSchema);