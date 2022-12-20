const router = require('express').Router();
const { check } = require('express-validator');
const { signUp, verifyOtp, getNearbyUsers } = require('./controllers/userController');
const { createProfile, getProfile, updateProfile, deleteProfile } = require('./controllers/profileController');
const { createMessage, getAllMessages, getMessageById, deleteMessage } = require('./controllers/messageController');
const { createMatch, updateMatch, deleteMatch } = require('./controllers/matchController');

// Auth Routes
router.route('/signup')
    .post(signUp);
router.route('/signup/verify')
    .post(verifyOtp);
router.route('/nearby-users').get(getNearbyUsers);

// Profile Routes [Apply check() for required fields]
router.route('/create',
    check('Abstract').not().isEmpty()
).post(createProfile);
router.route('/get').get(getProfile);
router.route('/update',
    check('Abstract').not().isEmpty()
).put(updateProfile);
router.route('/delete').delete(deleteProfile);

// Message Routes
router.route('/create-message').post(createMessage);
router.route('/get-all-messages').get(getAllMessages);
router.route('/get-message/:id').get(getMessageById);
router.route('/delete').delete(deleteMessage);

// Match Routes
router.route('/create-match').post(createMatch);
router.route('/update-match/:id').patch(updateMatch);
router.route('/delete-match/:id').delete(deleteMatch);

module.exports = router;