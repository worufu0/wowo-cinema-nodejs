const express = require('express');
const router = express.Router();
const passport = require('passport');
const loginC = require('../controllers/login.c');
const loginOneTime = require('../middlewares/login-one-time');

router.use(loginOneTime); // Login One Time

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login'],
    })
);
router.get('/facebook', passport.authenticate('facebook'));
router.post('/', loginC.login);
router.get('/', loginC.index);

module.exports = router;
