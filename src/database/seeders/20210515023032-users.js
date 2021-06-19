'use strict';

const TokenGenerator = require('uuid-token-generator');
const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('Users', [
            {
                id: '1',
                email: 'tntp@wowo.com',
                password: bcrypt.hashSync('123456', 10),
                fullName: 'Thiên Phú',
                userType: 0,
                admin: true,
                mailVerified: true,
                token: new TokenGenerator(
                    256,
                    TokenGenerator.BASE62
                ).generate(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '2',
                email: 'ttn@wowo.com',
                password: bcrypt.hashSync('123456', 10),
                fullName: 'Thành Nam',
                userType: 0,
                admin: true,
                mailVerified: true,
                token: new TokenGenerator(
                    256,
                    TokenGenerator.BASE62
                ).generate(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '3',
                email: 'tdn@wowo.com',
                password: bcrypt.hashSync('123456', 10),
                fullName: 'Đức Nhân',
                userType: 0,
                admin: true,
                mailVerified: true,
                token: new TokenGenerator(
                    256,
                    TokenGenerator.BASE62
                ).generate(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '4',
                email: 'dvn@wowo.com',
                password: bcrypt.hashSync('123456', 10),
                fullName: 'Văn Nhanh',
                userType: 0,
                admin: true,
                mailVerified: true,
                token: new TokenGenerator(
                    256,
                    TokenGenerator.BASE62
                ).generate(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('Users', null, {});
    },
};
