'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Bookings', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            userId: {
                type: Sequelize.STRING,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            showTimeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'ShowTimes',
                    key: 'id',
                },
            },
            bookingTime: {
                type: Sequelize.DATE,
            },
            total: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Bookings');
    },
};
