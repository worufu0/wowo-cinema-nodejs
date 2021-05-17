const appConfig = require('./app');

module.exports = {
    facebook: {
        clientID: process.env.FB_CLIENT_ID || '534165064268445',
        clientSecret:
            process.env.FB_CLIENT_SECRET || 'd3d1c923918ac6769632434e8863bcef',
        callbackURL: `${appConfig.urlRoot}/passport/facebook`,
    },
    google: {
        clientID:
            process.env.GG_CLIENT_ID ||
            '807060967947-6ri60c34mo04bk8ccqpv39s19f55kmpi.apps.googleusercontent.com',
        clientSecret:
            process.env.GG_CLIENT_SECRET || '7XXS8lgivaBliqY0Cmzr59eT',
        callbackURL: `${appConfig.urlRoot}/passport/google`,
    },
};
