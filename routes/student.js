const express = require('express');
const router = express.Router();
const {viewSlots, bookslot} = require('../controllers/studentCtrl');

router.route('/viewSlots').get(viewSlots);
router.route('/bookslot/:id').patch(bookslot);

module.exports = router