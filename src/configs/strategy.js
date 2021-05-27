module.exports = {
    facebook: {
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: `${
            process.env.URL_ROOT || 'http://localhost:3000'
        }/passport/facebook`,
    },
    google: {
        clientID: process.env.GG_CLIENT_ID,
        clientSecret: process.env.GG_CLIENT_SECRET,
        callbackURL: `${
            process.env.URL_ROOT || 'http://localhost:3000'
        }/passport/google`,
    },
};
