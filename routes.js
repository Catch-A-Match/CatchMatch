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
router.route('/profiles',
    check('Abstract').not().isEmpty()
).post(createProfile);

router.route('/profiles').get(getProfile);
router.route('/profiles',
    check('Abstract').not().isEmpty()
).put(updateProfile);
router.route('/profile').delete(deleteProfile);

module.exports = router;