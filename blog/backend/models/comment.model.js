"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Post, {
        foreignKey: "post_id",
        onDelete: "CASCADE",
      });
      Comment.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  Comment.init(
    {
      comment: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          max: 250,
        },
      },
      post_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "Posts",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
