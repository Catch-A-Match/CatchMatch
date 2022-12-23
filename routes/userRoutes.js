const router = require('express').Router();
const { signUp, verifyOtp, getNearbyUsers } = require('../controllers/userController');
// Auth Routes
router.route('/signup')
    .post(signUp);
router.route('/signup/verify')
    .post(verifyOtp);
router.route('/nearby-users').get(getNearbyUsers);

module.exports = router;