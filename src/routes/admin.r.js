const express = require('express');
const router = express.Router();
const adminC = require('../controllers/admin.c');
const loginRequired = require('../middlewares/login-required');
const loadFixedData = require('../middlewares/load-fixed-data');

router.use(loginRequired);
router.use(loadFixedData);

router.get('/logout', adminC.logout);
router.get('/showtime', adminC.showTimeList);
router.get('/room', adminC.roomList);
router.get('/cinema', adminC.cinemaList);
router.get('/movie', adminC.movieList);
router.get('/', adminC.index);

module.exports = router;
