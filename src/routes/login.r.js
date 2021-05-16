const express = require('express');
const router = express.Router();
const loginC = require('../controllers/login.c');
const loginOneTime = require('../middlewares/login-one-time');

router.use(loginOneTime); // Login One Time

router.get('/', loginC.index);
router.post('/', loginC.login);

module.exports = router;
