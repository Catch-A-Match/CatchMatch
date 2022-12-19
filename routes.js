const router = require('express').Router();
const { check } = require('express-validator');
const { signUp, verifyOtp } = require('./controllers/userController');
const { createProfile } = require('./controllers/profileController');

// Auth Routes
router.route('/signup')
    .post(signUp);
router.route('/signup/verify')
    .post(verifyOtp);

// Profile Routes [Apply check() for required fields]
router.post('/profiles', [
    check('Abstract').not().isEmpty(),
], createProfile)

module.exports = router;