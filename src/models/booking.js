'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: 'userId' });
            this.belongsTo(models.ShowTime, { foreignKey: 'showTimeId' });
            this.hasMany(models.Ticket, {
                foreignKey: 'bookingId',
                onDelete: 'cascade',
            });
        }
    }
    Booking.init(
        {
            userId: DataTypes.STRING,
            showTimeId: DataTypes.INTEGER,
            bookingTime: DataTypes.DATE,
            pay: DataTypes.FLOAT,
        },
        {
            sequelize,
            modelName: 'Booking',
        }
    );
    return Booking;
};
