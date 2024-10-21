"use strict";
const { Model, or } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("Pending", "Delivered", "Cancelled"),
      defaultValue: "Pending",
    },
    total_amount: DataTypes.INTEGER,
  });

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    Order.hasMany(models.Detail, {
      foreignKey: "order_id",
      as: "detail",
    });
  };
  return Order;
};
