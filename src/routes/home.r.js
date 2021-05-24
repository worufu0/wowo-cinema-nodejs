const express = require('express');
const router = express.Router();
const homeC = require('../controllers/home.c');
const loadFixedData = require('../middlewares/load-fixed-data');

router.use(loadFixedData); // Load Fixed Data

router.get('/', homeC.index);

module.exports = router;
