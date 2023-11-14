const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class UserStatus extends Model { };

UserStatus.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      statusId: {
        type: DataTypes.INTEGER,
      },
}, {
    sequelize,
    tableName: 'users-status',
    modelName: 'UserStatus'
});

module.exports = UserStatus;