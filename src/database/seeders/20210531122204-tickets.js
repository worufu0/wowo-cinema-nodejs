'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('Tickets', [
            {
                id: '1',
                bookingId: '1',
                seatName: 'E5',
                x: '5',
                y: 'E',
                price: 115,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '2',
                bookingId: '1',
                seatName: 'E6',
                x: '6',
                y: 'E',
                price: 115,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('Tickets', null, {});
    },
};
