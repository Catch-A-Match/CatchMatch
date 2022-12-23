const router = require('express').Router();
const { createMatch, updateMatch, deleteMatch } = require('../controllers/matchController');

// Match Routes
router.route('/create-match').post(createMatch);
router.route('/update-match/:id').patch(updateMatch);
router.route('/delete-match/:id').delete(deleteMatch);

module.exports = router;