const express = require('express');
const router = express.Router();
const seatC = require('../controllers/seat.c');
const loadFixedData = require('../middlewares/load-fixed-data');
const loginRequired = require('../middlewares/login-required');

router.use(loginRequired);

router.get('/select-seat', loadFixedData, seatC.selectSeat);
router.get('/', loadFixedData, seatC.index);

module.exports = router;
