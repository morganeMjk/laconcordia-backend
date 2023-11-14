const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class Status extends Model { };

Status.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
}, {
    sequelize,
    tableName: 'status',
    modelName: 'Status'
});

module.exports = Status;