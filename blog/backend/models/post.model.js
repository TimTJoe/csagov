"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      Post.hasMany(models.Comment, {
        foreignKey: "post_id",
        onDelete: "CASCADE",
      });
      Post.hasMany(models.Like, {
        foreignKey: "post_id",
        onDelete: "CASCADE",
      });
    }
  }
  Post.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          min: 5,
        },
      },
      body: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          len: [116, 500],
        },
      },
      category: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          min: 3,
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
