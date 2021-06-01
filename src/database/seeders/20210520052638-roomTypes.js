'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('RoomTypes', [
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
        return await queryInterface.bulkDelete('RoomTypes', null, {});
    },
};
