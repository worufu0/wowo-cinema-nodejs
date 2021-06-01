'use strict';

const Sequelize = require('sequelize');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Booking, { foreignKey: 'userId' });
        }
    }
    User.init(
        {
            id: { primaryKey: true, type: Sequelize.STRING },
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            fullName: DataTypes.TEXT,
            phone: DataTypes.STRING,
            avatar: DataTypes.STRING(500),
            userType: DataTypes.INTEGER,
            admin: DataTypes.BOOLEAN,
            token: DataTypes.STRING,
            verified: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
