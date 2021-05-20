'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('RoomTypes', [
            {
                name: '2D',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: '3D',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: '4DX',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('RoomTypes', null, {});
    },
};
