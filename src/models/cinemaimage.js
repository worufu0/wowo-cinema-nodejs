'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CinemaImage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Cinema, { foreignKey: 'cinemaId' });
        }
    }
    CinemaImage.init(
        {
            name: DataTypes.STRING,
            cinemaId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'CinemaImage',
        }
    );
    return CinemaImage;
};
