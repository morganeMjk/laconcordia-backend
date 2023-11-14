const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class News extends Model { };

News.init({
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
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
      authorId: {
        type: DataTypes.INTEGER,
      },
}, {
    sequelize,
    tableName: 'news',
    modelName: 'News'
});

module.exports = News;