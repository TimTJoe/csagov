"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 3,
          isAlpha: true
        }
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 3,
          isAlpha: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          min: 5,
          isAlphanumeric: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8
        }
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
