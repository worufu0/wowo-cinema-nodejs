const express = require('express');
const router = express.Router();
const registerC = require('../controllers/register.c');
const loginOneTime = require('../middlewares/login-one-time');

router.use(loginOneTime); // Login One Time

router.get('/', registerC.index);
router.post('/', registerC.register);
router.get('/verify/:token', registerC.verify);

module.exports = router;
