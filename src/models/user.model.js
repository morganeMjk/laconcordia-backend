const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database.config");

class User extends Model { };

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
      notification: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      deletionDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      emailVerificationCode: {
        type: DataTypes.STRING,
        allowNull: true
      },
      emailVerificationCodeExpiration: {
        type: DataTypes.DATE,
        allowNull: true
      },
      passwordResetCode: {
        type: DataTypes.STRING,
        allowNull: true
      },
      passwordResetCodeExpiration: {
        type: DataTypes.DATE,
        allowNull: true
      },
      accessToken: {
        type: DataTypes.TEXT('long'),
        allowNull: true
      },
}, {
    sequelize,
    tableName: 'users',
    modelName: 'User'
});

module.exports = User;