const appConfig = require('./app');

module.exports = {
    facebook: {
        clientID: '534165064268445',
        clientSecret: 'd3d1c923918ac6769632434e8863bcef',
        callbackURL: `${appConfig.urlRoot}/passport/facebook`,
    },
    google: {
        clientID:
            '807060967947-6ri60c34mo04bk8ccqpv39s19f55kmpi.apps.googleusercontent.com',
        clientSecret: '7XXS8lgivaBliqY0Cmzr59eT',
        callbackURL: `${appConfig.urlRoot}/passport/google`,
    },
};
