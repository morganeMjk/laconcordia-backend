const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class UserInstrument extends Model { };

UserInstrument.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      instrumentId: {
        type: DataTypes.INTEGER,
      },
}, {
    sequelize,
    tableName: 'users-instruments',
    modelName: 'UserInstrument'
});

module.exports = UserInstrument;