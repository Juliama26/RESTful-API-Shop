"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    user_role: {
      type: DataTypes.ENUM("Admin", "Customer"),
      defaultValue: "Customer",
    },
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
    image_url: DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
  });
  User.associate = function (models) {
    User.hasMany(models.Order, {
      foreignKey: "user_id",
      as: "order",
    });
  };
  return User;
};
