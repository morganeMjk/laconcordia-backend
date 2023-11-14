const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class UserRole extends Model { };

UserRole.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      roleId: {
        type: DataTypes.INTEGER,
      },
}, {
    sequelize,
    tableName: 'users-roles',
    modelName: 'UserRole'
});

module.exports = UserRole;