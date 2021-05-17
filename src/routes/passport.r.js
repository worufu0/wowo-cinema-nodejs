const express = require('express');
const passport = require('passport');
const router = express.Router();
const passportC = require('../controllers/passport.c');

router.get(
    '/google',
    passport.authenticate('google', {
        failureRedirect: '/login',
    }),
    passportC.google
);
router.get(
    '/facebook',
    passport.authenticate('facebook', {
        failureRedirect: '/login',
    }),
    passportC.facebook
);

module.exports = router;
