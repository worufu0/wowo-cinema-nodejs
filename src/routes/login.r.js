const express = require('express');
const router = express.Router();
const passport = require('passport');
const loginC = require('../controllers/login.c');
const loginOneTime = require('../middlewares/login-one-time');
const rememberMe = require('../middlewares/remember-me');

router.use(loginOneTime); // Login One Time
router.use(rememberMe); // Remember Me

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login', 'email'],
    })
);
router.get(
    '/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);
router.post('/', loginC.login);
router.get('/', loginC.index);

module.exports = router;
