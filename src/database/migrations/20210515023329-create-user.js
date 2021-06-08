'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            fullName: {
                type: Sequelize.TEXT,
            },
            phone: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            avatar: {
                type: Sequelize.STRING(500),
            },
            userType: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            admin: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            token: {
                type: Sequelize.STRING,
            },
            mailVerified: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
        await queryInterface.dropTable('Users');
    },
};
