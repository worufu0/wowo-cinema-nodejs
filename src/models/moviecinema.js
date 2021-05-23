'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MovieCinema extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Movie, { foreignKey: 'movieId' });
            this.belongsTo(models.Cinema, { foreignKey: 'cinemaId' });
        }
    }
    MovieCinema.init(
        {
            movieId: DataTypes.INTEGER,
            cinemaId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'MovieCinema',
        }
    );
    return MovieCinema;
};
