'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ShowTimes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            movieId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Movies',
                    key: 'id',
                },
            },
            roomId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Rooms',
                    key: 'id',
                },
            },
            time: {
                type: Sequelize.STRING,
            },
            price: {
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
        await queryInterface.dropTable('ShowTimes');
    },
};
