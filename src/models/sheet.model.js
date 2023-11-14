const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class Sheet extends Model { };

Sheet.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sheetFile: {
        type: DataTypes.STRING,
        allowNull: false
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: false
      },
      instrumentId: {
        type: DataTypes.INTEGER,
      },
}, {
    sequelize,
    tableName: 'sheets',
    modelName: 'Sheet'
});

module.exports = Sheet;