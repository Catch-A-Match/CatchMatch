const router = require('express').Router();
const { check } = require('express-validator');
const { signUp, verifyOtp } = require('./controllers/userController');
const { createProfile, getProfile, updateProfile, deleteProfile } = require('./controllers/profileController');

// Auth Routes
router.route('/signup')
    .post(signUp);
router.route('/signup/verify')
    .post(verifyOtp);

// Profile Routes [Apply check() for required fields]
router.post('/profiles', [
    check('Abstract').not().isEmpty(),
], createProfile)
router.get('/profiles', getProfile);

module.exports = router;