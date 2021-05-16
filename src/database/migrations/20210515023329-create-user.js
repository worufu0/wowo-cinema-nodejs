'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            fullName: {
                type: Sequelize.TEXT,
                defaultValue: 'chưa đặt tên',
            },
            phone: {
                type: Sequelize.STRING,
                defaultValue: 'không có',
            },
            userType: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
            },
            admin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            token: {
                type: Sequelize.STRING,
            },
            verified: {
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
