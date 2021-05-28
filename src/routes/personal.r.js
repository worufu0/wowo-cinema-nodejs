const express = require('express');
const router = express.Router();
const personalC = require('../controllers/personal.c');
const loadFixedData = require('../middlewares/load-fixed-data');

router.get('/', loadFixedData, personalC.index);

module.exports = router;
