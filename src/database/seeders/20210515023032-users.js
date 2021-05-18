'use strict';

const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                uuid: '1',
                email: 'admin@wowo.com',
                password: bcrypt.hashSync('123456', 10),
                fullName: 'Admin',
                userType: 0,
                admin: true,
                verified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
