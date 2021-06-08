module.exports = {
    facebook: {
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        profileFields: ['id', 'displayName', 'email', 'picture.type(large)'],
        callbackURL: `${process.env.URL_ROOT}/passport/facebook`,
    },
    google: {
        clientID: process.env.GG_CLIENT_ID,
        clientSecret: process.env.GG_CLIENT_SECRET,
        callbackURL: `${process.env.URL_ROOT}/passport/google`,
    },
};
