const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class Role extends Model { };

Role.init({
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
}, {
    sequelize,
    tableName: 'roles',
    modelName: 'Role'
});

module.exports = Role;