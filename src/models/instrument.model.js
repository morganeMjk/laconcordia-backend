const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class Instrument extends Model { };

Instrument.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false
      },
      statusId: {
        type: DataTypes.INTEGER,
      },
}, {
    sequelize,
    tableName: 'instruments',
    modelName: 'Instrument'
});

module.exports = Instrument;