const express = require('express');
const router = express.Router();
const recoveryC = require('../controllers/recovery.c');

router.post('/:token', recoveryC.change);
router.get('/:token', recoveryC.reset);
router.post('/', recoveryC.recovery);
router.get('/', recoveryC.index);

module.exports = router;
