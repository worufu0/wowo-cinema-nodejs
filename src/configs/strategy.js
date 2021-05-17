const appConfig = require('./app');

module.exports = {
    facebook: {
        clientID: '2861463914164384',
        clientSecret: 'f5a3edffddb8cda516a9f84c476ffec6',
        callbackURL: `${appConfig.urlRoot}/passport/facebook`,
    },
};
