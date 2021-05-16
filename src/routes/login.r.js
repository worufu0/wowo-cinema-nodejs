const express = require('express');
const router = express.Router();
const loginC = require('../controllers/login.c');

router.get('/', loginC.index);
router.post('/', loginC.index);

module.exports = router;
