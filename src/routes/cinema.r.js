const express = require('express');
const router = express.Router();
const cinemaC = require('../controllers/cinema.c');
const loadFixedData = require('../middlewares/load-fixed-data');

router.get('/:unsignedName', loadFixedData, cinemaC.index);

module.exports = router;
