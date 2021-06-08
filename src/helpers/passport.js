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
                        id: profile._json.id,
                        fullName: profile._json.name,
                        email: profile._json.email,
                        avatar: profile._json.picture.data.url,
                        mailVerified: true,
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
                        id: profile._json.sub,
                        fullName: profile._json.name,
                        email: profile._json.email,
                        avatar: profile._json.picture,
                        mailVerified: true,
                        userType: 2,
                    },
                });
                done(null, profile);
            }
        )
    );
};
