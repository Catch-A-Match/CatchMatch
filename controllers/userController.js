const bcrypt = require('bcrypt');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const express = require('express');
const router = express.Router();
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const { User } = require('../models/User');
const { Otp } = require('../models/otp');

/**
 * Send OTP using Twilio
 */
function sendOTP(to, otp) {
    client.messages.create({
        to: to,
        from: '+13863392212',
        body: `Your OTP is ${otp}. Please do not share with anyone`,
    }, (err, message) => {
        if (message) {
            console.log(message.sid);
        } else {
            console.log(`Error sending SMS: ${err}`);
        }
    });
}

// Generate JWT for the user
function generateJWT(user) {
    return jwt.sign({
        id: user._id,
        username: user.username,
        number: user.number
    }, process.env.JWT_SECRET, { expiresIn: '3d' });
}

/**
 * Function to get Number and Send OTP using SMS Twilio
 */
router.post('/signUp', async (req, res) => {
    try {
        const user = await User.findOne({ number: req.body.number })
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        const OTP = otpGenerator.generate(6, {
            digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
        });
        console.log(OTP);
        
        const salt = await bcrypt.genSalt(10);
        const hashedOTP = await bcrypt.hash(OTP, salt);
        // Save the OTP
        const otp = new Otp({ number: req.body.number, otp: hashedOTP });
        await otp.save();

        sendOTP(number, OTP);
        return res.status(201).send(" OTP Sent Successfully ");
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: "Cannot Sign Up"
        });
    }
});

/**
 * Function to verify OTP
 */
router.post('/signup/verify', async (req, res) => {
    const otpHolder = await Otp.find({ number: req.body.number }).sort({
        createdAt: -1
    }).limit(1);
    if (otpHolder.length == 0) {
        return res.status(400).json({ msg: "OTP Expired" });
    }

    // Compare OTP sent with hashed OTP
    const validateUser = await bcrypt.compare(req.body.otp, otpHolder[0].otp);
    if (validateUser) {
        // Create new User
        const newUser = new User({
            number: req.body.number,
            username: req.body.username,
            location: req.body.location
        });
        const result = await newUser.save();
        // Delete OTP from database
        await Otp.deleteMany({ number: req.body.number });
        // JWT Token
        const token = generateJWT(newUser);
        res.status(200).send({
            message: "User Registered",
            token: token,
            data: result
        });
    } else {
        return res.status(400).send("Wrong OTP Entered");
    }
});

/**
 * Function to get Nearby Users
 */
router.get('/nearby-users', async (req, res) => {
    try {
        const userId = req.query.userId;
        const radius = req.query.radius;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        const nearbyUsers = await helper(userId, radius, page, limit);
        res.json({ nearbyUsers });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

/**
 *  Helper Function to get nearby users
*/
const helper = async (userId, radius, page, limit) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error(`User with Id ${userId} not Found`);
    }
    const { latitude, longitude } = user.location;

    // GeoSpatial Query to find other users within the radius
    const nearbyUsers = await User.find({
        location: {
            $geometry: {
                type: "Point",
                coordinates: [longitude, latitude]
            },
            $maxdistance: radius
        }
    })
    .skip((page - 1) * limit) // skip specified no. of documents
    .limit(limit) // limit no. of documents returned
    .exec();

    return nearbyUsers;
}

module.exports = router;