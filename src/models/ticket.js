'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ticket extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Booking, { foreignKey: 'bookingId' });
        }
    }
    Ticket.init(
        {
            bookingId: DataTypes.STRING,
            seatName: DataTypes.STRING,
            x: DataTypes.STRING,
            y: DataTypes.STRING,
            price: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Ticket',
        }
    );
    return Ticket;
};
