const express = require('express');
const router = express.Router();
const logoutC = require('../controllers/logout.c');

router.get('/', logoutC.index);

module.exports = router;
