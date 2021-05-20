const express = require('express');
const router = express.Router();
const homeC = require('../controllers/home.c');

router.post('/select', homeC.select);
router.get('/', homeC.index);

module.exports = router;
