const passport = require('passport');
const TokenGenerator = require('uuid-token-generator');
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
                const token = new TokenGenerator(
                    256,
                    TokenGenerator.BASE62
                ).generate();
                const fetch = await require('node-fetch')(
                    `https://graph.facebook.com/${profile._json.id}/picture?type=large&redirect=false`
                );
                const profilePicture = await fetch.json();

                await User.findOrCreate({
                    where: {
                        id: profile._json.id,
                        fullName: profile._json.name,
                        email: profile._json.email,
                        avatar: profilePicture.data.url,
                        mailVerified: true,

                        userType: 1,
                    },
                });

                await User.update(
                    { token: token },
                    { where: { id: profile._json.id } }
                );

                done(null, profile);
            }
        )
    );

    passport.use(
        new GoogleStrategy(
            stategyConfig.google,
            async (accessToken, refreshToken, profile, done) => {
                const token = new TokenGenerator(
                    256,
                    TokenGenerator.BASE62
                ).generate();

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

                await User.update(
                    { token: token },
                    { where: { id: profile._json.sub } }
                );

                done(null, profile);
            }
        )
    );
};
