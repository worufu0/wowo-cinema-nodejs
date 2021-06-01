'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('Bookings', [
            {
                id: '1',
                userId: '1',
                showTimeId: 1,
                bookingTime: new Date(),
                total: 230,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('Bookings', null, {});
    },
};
