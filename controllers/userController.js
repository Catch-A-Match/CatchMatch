const bcrypt = require('bcrypt');
const _ = require('lodash');
const axios = require('axios');
const twilio = require('twilio');
const otpGenerator = require('otp-generator');

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

/**
 * Function to get Number and Send OTP using SMS Twilio
 */
module.exports.signUp = async (req, res) => {
    try {
        const user = await User.findOne({
            number: req.body.number,
            username: req.body.username,
        });
        const number = req.body.number.toString();
        const username = req.body.username;
        if (user) {
            return res.status(400).json({
                error: true,
                message: "Username already in user"
            });
        }
        // Randomly Generate OTP
        // const OTP = Math.floor(100000 + Math.random() * 900000);
        const OTP = otpGenerator.generate(6, {
            digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
        });
        console.log(OTP);
        
        const otp = new Otp({ number: number, otp: OTP })
        const salt = await bcrypt.genSalt(10);
        otp.otp = await bcrypt.hash(OTP, salt);
        const result = await otp.save();

        sendOTP(number, OTP);
        return res.status(201).send(" OTP Sent Successfully ");
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: "Cannot Sign Up"
        });
    }
}

/**
 * Function to verify OTP
 */
module.exports.verifyOtp = async (req, res) => {
    const otpHolder = await Otp.find({
        number: req.body.number,
        username: req.body.username
    });

    if (otpHolder.length == 0) {
        return res.status(400).send("OTP Expired");
    }

    // Suppose Multiple OTPs are sent, we need the latest one so...
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validateUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    if (rightOtpFind.number == req.body.number && validateUser) {
        const user = new User(_.pick(req.body, ['number', 'username']));
        const token = user.generateJWT();
        const result = await user.save();

        // When User is assigned, then delete OTP
        const deleteOtp = await Otp.deleteMany({
            number: rightOtpFind.number
        });

        user.save();
        return res.status(200).send({
            message: "Your are Registered", 
            token: token,
            data: result
        });
    } else {
        return res.status(400).send("Wrong OTP Entered");
    }
}

/**
 * Function to get Nearby Users
 */
exports.getNearbyUsers = async (req, res) => {
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
};

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

module.exports = { helper }