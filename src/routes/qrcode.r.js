const express = require('express');
const router = express.Router();
const qrCode = require('../controllers/qrcode.c');

router.get('/generate/:id', qrCode.generate);
router.get('/:id', qrCode.index);

module.exports = router;
