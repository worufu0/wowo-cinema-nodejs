'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Movies', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            name: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            unsignedName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            category: {
                type: Sequelize.TEXT,
            },
            time: {
                type: Sequelize.INTEGER,
            },
            country: {
                type: Sequelize.TEXT,
            },
            director: {
                type: Sequelize.TEXT,
            },
            video: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            price: {
                type: Sequelize.INTEGER,
            },
            openingDay: {
                type: Sequelize.DATEONLY,
            },
            image: {
                type: Sequelize.STRING,
            },
            sold: {
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
        await queryInterface.dropTable('Movies');
    },
};
