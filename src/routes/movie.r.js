const express = require('express');
const router = express.Router();
const movieC = require('../controllers/movie.c');
const loadFixedData = require('../middlewares/load-fixed-data');

router.get('/change-cinema', movieC.changeCinema);
router.get('/:unsignedName', loadFixedData, movieC.index);
router.get('/', loadFixedData, movieC.all);

module.exports = router;
