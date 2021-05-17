const express = require('express');
const router = express.Router();
const registerC = require('../controllers/register.c');
const loginOneTime = require('../middlewares/login-one-time');

router.use(loginOneTime); // Login One Time

router.get('/verify/:token', registerC.verify);
router.post('/', registerC.register);
router.get('/', registerC.index);

module.exports = router;
