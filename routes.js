const router = require('express').Router();
const { check } = require('express-validator');
const { signUp, verifyOtp } = require('./controllers/userController');
const { createProfile, getProfile, updateProfile, deleteProfile } = require('./controllers/profileController');
const { createMessage, getAllMessages, getMessageById, deleteMessage } = require('./controllers/messageController');

// Auth Routes
router.route('/signup')
    .post(signUp);
router.route('/signup/verify')
    .post(verifyOtp);

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
router.route('/createmessage').post(createMessage);
router.route('/getallmessages').get(getAllMessages);
router.route('/getmessagebyid/:id').get(getMessageById);
router.route('/delete').delete(deleteMessage);

module.exports = router;