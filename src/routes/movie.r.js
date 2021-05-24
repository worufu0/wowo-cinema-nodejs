const express = require('express');
const router = express.Router();
const movieC = require('../controllers/movie.c');
const loadFixedData = require('../middlewares/load-fixed-data');

router.use(loadFixedData); // Load Fixed Data

router.get('/:unsignedName', movieC.index);

module.exports = router;
