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
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
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

// Enable GeoSpatial Indexing on the location Field
userSchema.index({ location: '2dsphere' });

module.exports.User = mongoose.model('User', userSchema);