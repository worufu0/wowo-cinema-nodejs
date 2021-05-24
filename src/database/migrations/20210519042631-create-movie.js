'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Movies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.TEXT,
                unique: true,
            },
            unsignedName: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
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
