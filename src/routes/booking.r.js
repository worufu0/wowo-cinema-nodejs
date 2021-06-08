const express = require('express');
const router = express.Router();
const bookingC = require('../controllers/booking.c');
const loadFixedData = require('../middlewares/load-fixed-data');
const loginRequired = require('../middlewares/login-required');
const queryStringRequired = require('../middlewares/query-string-required');

router.use(loginRequired);

router.get('/select-seat', queryStringRequired, bookingC.selectSeat);
router.get('/', queryStringRequired, loadFixedData, bookingC.index);

module.exports = router;
