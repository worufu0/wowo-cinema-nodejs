module.exports = {
    facebook: {
        clientID: process.env.FB_CLIENT_ID || '177192964223564',
        clientSecret:
            process.env.FB_CLIENT_SECRET || '25cdc9d192676c1785d7a20f488f779b',
        profileFields: ['id', 'displayName', 'email', 'picture.type(large)'],
        callbackURL: `${
            process.env.URL_ROOT || 'http://localhost:3000'
        }/passport/facebook`,
    },
    google: {
        clientID:
            process.env.GG_CLIENT_ID ||
            '807060967947-jns93huc7e3vtmvp2n8iinc3rpbl3d39.apps.googleusercontent.com',
        clientSecret:
            process.env.GG_CLIENT_SECRET || 'gq3zYfHa4pXQ7eN84G0BNssd',
        callbackURL: `${
            process.env.URL_ROOT || 'http://localhost:3000'
        }/passport/google`,
    },
};
