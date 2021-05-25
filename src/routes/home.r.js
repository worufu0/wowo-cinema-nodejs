const express = require('express');
const router = express.Router();
const homeC = require('../controllers/home.c');
const loadFixedData = require('../middlewares/load-fixed-data');

router.get('/', loadFixedData, homeC.index);

module.exports = router;
