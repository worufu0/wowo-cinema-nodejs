const { User } = require('../models');

module.exports = async (req, res, next) => {
    const { email } = req.session;

    if (email) {
        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (user) {
            req.user = user;
            user.fullName
                ? (res.locals.displayName = user.fullName)
                : (res.locals.displayName = email);
        }
        next();
    } else {
        next();
    }
};
