const bcrypt = require('bcrypt');
const _ = require('lodash');
const axios = require('axios');
const otpGenerator = require('otp-generator');

const { User } = require('../models/User');
const { Otp } = require('../models/otp');

/**
 * Function to get Number and Send OTP
 */
module.exports.signUp = async (req, res) => {
    const user = await User.findOne({
        number: req.body.number
    });
    const number = req.body.number;

    if (user) {
        return res.status(400).send("User Already registered");
    }
    const OTP = otpGenerator.generate(6, {
        digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
    });
    console.log(OTP);
    
    const otp = new Otp({ number: number, otp: OTP });
    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, salt); 
    const result = await otp.save();
    
    return res.status(200).send("OTP Sent Successfully");
}

/**
 * Function to verify OTP
 */
module.exports.verifyOtp = async (req, res) => {
    const otpHolder = await Otp.find({
        number: req.body.number
    });

    if (otpHolder.length == 0) {
        return res.status(400).send("OTP Expired");
    }

    // Suppose Multiple OTPs are sent, we need the latest one so...
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validateUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    if (rightOtpFind.number == req.body.number && validateUser) {
        const user = new User(_.pick(req.body, ['number']));
        const token = user.generateJWT();
        const result = await user.save();

        // When User is assigned, then delete OTP
        const deleteOtp = await Otp.deleteMany({
            number: rightOtpFind.number
        });

        return res.status(200).send({
            message: "Your are Registered", 
            token: token,
            data: result
        });
    } else {
        return res.status(400).send("Wrong OTP Entered");
    }
}