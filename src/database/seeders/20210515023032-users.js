'use strict';

const TokenGenerator = require('uuid-token-generator');
const tokgen = new TokenGenerator();
const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                id: tokgen.generate(),
                email: 'admin@wowo.com',
                password: bcrypt.hashSync('123456', 10),
                fullName: 'Wowo Admin',
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
