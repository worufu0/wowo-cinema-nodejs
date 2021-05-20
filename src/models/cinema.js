'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cinema extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Room, { foreignKey: 'cinemaId' });
        }
    }
    Cinema.init(
        {
            name: DataTypes.STRING,
            unsignedName: DataTypes.STRING,
            address: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Cinema',
        }
    );
    return Cinema;
};
