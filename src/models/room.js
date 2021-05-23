'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.RoomType, {
                foreignKey: 'roomTypeId', //id
            });
            this.belongsTo(models.Cinema, {
                foreignKey: 'cinemaId', //id
            });
            this.belongsToMany(models.ShowTime, {
                through: 'ShowTime',
                foreignKey: 'roomId',
            });
        }
    }
    Room.init(
        {
            name: DataTypes.STRING,
            cinemaId: DataTypes.INTEGER,
            roomTypeId: DataTypes.INTEGER,
            row: DataTypes.INTEGER,
            col: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Room',
        }
    );
    return Room;
};
