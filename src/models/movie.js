'use strict';

const Sequelize = require('sequelize');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Movie extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Movie.init(
        {
            id: { primaryKey: true, type: Sequelize.STRING },
            name: DataTypes.TEXT,
            unsignedName: DataTypes.STRING,
            category: DataTypes.TEXT,
            time: DataTypes.INTEGER,
            country: DataTypes.TEXT,
            director: DataTypes.TEXT,
            trailer: DataTypes.STRING,
            description: DataTypes.TEXT,
            price: DataTypes.INTEGER,
            openingDay: DataTypes.DATEONLY,
            poster: DataTypes.STRING,
            sold: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Movie',
        }
    );
    return Movie;
};
