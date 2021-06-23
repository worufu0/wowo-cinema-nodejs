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
                onDelete: 'cascade',
                onUpdate: 'cascade',
            },
            showTimeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'ShowTimes',
                    key: 'id',
                },
                onDelete: 'cascade',
                onUpdate: 'cascade',
            },
            bookingTime: {
                type: Sequelize.DATE,
            },
            pay: {
                type: Sequelize.FLOAT,
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
