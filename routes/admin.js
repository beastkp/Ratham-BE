const express = require('express');
const router = express.Router();
const {insertion} = require('../insertion');
const {getAllAppointments} = require('../controllers/adminCtrl');

router.get('/insertmany', insertion)
router.route('/appointments').get(getAllAppointments);

module.exports = router;