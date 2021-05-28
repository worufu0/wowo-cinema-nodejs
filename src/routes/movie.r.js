const express = require('express');
const router = express.Router();
const movieC = require('../controllers/movie.c');
const loadFixedData = require('../middlewares/load-fixed-data');

router.get('/all', loadFixedData, movieC.all);
router.get('/change-cinema', movieC.changeCinema);
router.get('/:unsignedName', loadFixedData, movieC.index);

module.exports = router;
