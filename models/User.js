const mongoose = require('mongoose');

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

// Enable GeoSpatial Indexing on the location Field
userSchema.index({ location: '2dsphere' });

module.exports.User = mongoose.model('User', userSchema);