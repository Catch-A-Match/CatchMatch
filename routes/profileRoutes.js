const express = require('express');
const router = express.Router();
const { createProfile, getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');
const { check } = require('express-validator');

// Profile Routes [Apply check() for required fields]
router.route('/create', [
check('Abstract').not().isEmpty(),
check('Age').not().isEmpty(),
check('Gender').not().isEmpty(),
check('interests').not().isEmpty(),
check('zodiac').not().isEmpty(),
check('pets').not().isEmpty(),
check('company').not().isEmpty(),
check('drinking').not().isEmpty(),
check('smoking').not().isEmpty(),
check('perfectdatequestion').not().isEmpty(),
check('quote').not().isEmpty()
])
.post(createProfile);
router.route('/get').get(getProfile);
router.route('/update')
.put(updateProfile);
router.route('/delete').delete(deleteProfile);

module.exports = router;