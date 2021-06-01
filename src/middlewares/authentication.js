const { User } = require('../models');

module.exports = async (req, res, next) => {
    const id = req.session.userId;

    if (id) {
        const user = JSON.parse(
            JSON.stringify(
                await User.findOne({
                    where: { id: id },
                })
            )
        );

        if (user) {
            req.user = user;
        }

        next();
    } else {
        next();
    }
};
