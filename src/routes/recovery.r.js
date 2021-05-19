const express = require('express');
const router = express.Router();
const recoveryC = require('../controllers/recovery.c');
const loginOneTime = require('../middlewares/login-one-time');

router.use(loginOneTime); // Login One Time

router.patch('/:token', recoveryC.change);
router.get('/:token', recoveryC.reset);
router.post('/', recoveryC.recovery);
router.get('/', recoveryC.index);

module.exports = router;
