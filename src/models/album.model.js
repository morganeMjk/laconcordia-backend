const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class Album extends Model { };

Album.init({
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
      thumbnail: {
        type: DataTypes.BLOB('long'),
        allowNull: false
      },
}, {
    sequelize,
    tableName: 'albums',
    modelName: 'Album'
});

module.exports = Album;