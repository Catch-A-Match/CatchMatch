const { Profile } = require('../models/Profile');
const { User } = require('../models/User');
const { check, validationResult } = require('express-validator');

/**
 * Create a Profile
 */
exports.createProfile = (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }

    const { instagram, Age, Gender, Abstract, interests, zodiac, pets, company, drinking, smoking, perfectdatequestion, quote } = req.body;
    // New Profile Object
    const newProfile = new Profile({
        user: req.body.username,
        instagram, // Not required
        Age, 
        Gender, 
        Abstract, 
        interests, 
        zodiac, 
        pets, 
        company, 
        drinking, 
        smoking, 
        perfectdatequestion, 
        quote  
    });

    // Save to Database
    newProfile.save().then(profile => res.json(profile))
        .catch(err => console.error(err));
}

/**
 * Get Profile
 */
exports.getProfile = (req, res) => {
    Profile.findOne({ user: req.body.usernam })
        .populate('user', ['username'])
        .then(profile => {
            if (!profile) {
                return res.status(400).json({ msg: "There is no Profile for this User" });
            }
            res.json(profile);
        })
        .catch(err => console.error(err));
}

/**
 * Update Profile
 */
exports.updateProfile = (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ msg: err.array() });
    }

    // Get Updated profile fields from the req body
    const profileFields = {};
    if (Instagram) profileFields.Instagram = Instagram;
    if (Age) profileFields.Age = Age;
    if (Gender) profileFields.Gender = Gender;
    if (Abstract) profileFields.Abstract = Abstract;
    if (interests) profileFields.interests = interests;
    if (zodiac) profileFields.zodiac = zodiac;
    if (pets) profileFields.pets = pets;
    if (company) profileFields.company = company;
    if (drinking) profileFields.drinking = drinking;
    if (smoking) profileFields.smoking = smoking;
    if (perfectdatequestion) profileFields.perfectdatequestion = perfectdatequestion;
    if (quote) profileFields.quote = quote;
    
    Profile.findOneAndUpdate(
        { user: req.body.username.id },
        { $set: profileFields },
        { new: true }
    )
    .then(profile => res.json(profile))
    .catch(err => console.error(err));
};

/**
 * Delete Profile
 */
exports.deleteProfile = (req, res) => {
    Profile.findOneAndRemove({ user: req.body.username })
        .then(() => {
            User.findOneAndRemove({ _id: req.body.username.id })
                .then(() => res.json({ msg: 'User Deleted' }))
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
};