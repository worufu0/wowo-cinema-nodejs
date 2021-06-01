'use strict';

const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('Users', [
            {
                id: '1',
                email: 'admin@wowo.com',
                password: bcrypt.hashSync('123456', 10),
                fullName: 'Wowo Admin',
                userType: 0,
                admin: true,
                verified: true,
                avatar: 'admin.png',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('Users', null, {});
    },
};
