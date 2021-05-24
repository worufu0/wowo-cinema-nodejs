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
            this.hasMany(models.MovieImage, { foreignKey: 'movieId' });
            this.hasMany(models.ShowTime, { foreignKey: 'movieId' });
        }
    }
    Movie.init(
        {
            name: { type: DataTypes.TEXT, unique: true },
            unsignedName: { type: DataTypes.STRING, unique: true },
            category: DataTypes.TEXT,
            time: DataTypes.INTEGER,
            country: DataTypes.TEXT,
            director: DataTypes.TEXT,
            video: DataTypes.STRING,
            description: DataTypes.TEXT,
            openingDay: DataTypes.DATEONLY,
            image: DataTypes.STRING,
            sold: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Movie',
        }
    );
    return Movie;
};
