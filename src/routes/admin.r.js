const path = require('path');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const adminC = require('../controllers/admin.c');
const loginRequired = require('../middlewares/login-required');
const loadFixedData = require('../middlewares/load-fixed-data');
const upload = multer({
    dest: path.join('src', 'uploads'),
});

router.use(loginRequired);
router.use(loadFixedData);

router.delete('/showtime', adminC.showTimeDelete);
router.delete('/room', adminC.roomDelete);
router.delete('/cinema', adminC.cinemaDelete);
router.delete('/movie', adminC.movieDelete);
router.post('/showtime', adminC.showTimeCreate);
router.post('/room', adminC.roomCreate);
router.post(
    '/cinema',
    upload.fields([
        {
            name: 'inputImages',
        },
    ]),
    adminC.cinemaCreate
);
router.post(
    '/movie',
    upload.fields([
        {
            name: 'inputPoster',
            maxCount: 1,
        },
        {
            name: 'inputBanner',
            maxCount: 1,
        },
        {
            name: 'inputImages',
        },
    ]),
    adminC.movieCreate
);
router.get('/showtime', adminC.showTimeList);
router.get('/room', adminC.roomList);
router.get('/cinema', adminC.cinemaList);
router.get('/movie', adminC.movieList);
router.get('/', adminC.index);

module.exports = router;
