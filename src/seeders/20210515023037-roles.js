'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Roles', [
            {
                roleName: 'Admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                roleName: 'User',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Roles', null, {});
    },
};
