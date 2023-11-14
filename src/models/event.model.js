const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class Event extends Model { };

Event.init({
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
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
      eventDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      authorId: {
        type: DataTypes.INTEGER,
      },
}, {
    sequelize,
    tableName: 'events',
    modelName: 'Event'
});

module.exports = Event;