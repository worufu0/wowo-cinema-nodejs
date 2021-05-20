'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Rooms', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            cinemaId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Cinemas',
                    key: 'id',
                    as: 'cinemaId',
                },
            },
            roomTypeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'RoomTypes',
                    key: 'id',
                    as: 'roomTypeId',
                },
            },
            row: {
                type: Sequelize.INTEGER,
            },
            col: {
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
        await queryInterface.dropTable('Rooms');
    },
};
