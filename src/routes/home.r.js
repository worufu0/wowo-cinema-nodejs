const express = require('express');
const router = express.Router();
const homeC = require('../controllers/home.c');

router.get('/', homeC.index);

module.exports = router;
