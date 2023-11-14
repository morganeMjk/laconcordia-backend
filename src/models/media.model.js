const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class Media extends Model { };

Media.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false
      },
      albumId: {
        type: DataTypes.INTEGER,
      },
}, {
    sequelize,
    tableName: 'medias',
    modelName: 'Media'
});

module.exports = Media;



