const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../models');
const stategyConfig = require('../configs/strategy');

exports.call = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(
        new FacebookStrategy(
            stategyConfig.facebook,
            async (accessToken, refreshToken, profile, done) => {
                await User.findOrCreate({
                    where: {
                        id: profile.id,
                        fullName: profile.displayName,
                        verified: true,
                        userType: 1,
                    },
                });
                done(null, profile);
            }
        )
    );

    passport.use(
        new GoogleStrategy(
            stategyConfig.google,
            async (accessToken, refreshToken, profile, done) => {
                await User.findOrCreate({
                    where: {
                        id: profile.id,
                        fullName: profile.displayName,
                        verified: true,
                        userType: 2,
                    },
                });
                done(null, profile);
            }
        )
    );
};
