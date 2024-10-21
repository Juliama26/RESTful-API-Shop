"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Detail = sequelize.define("Detail", {
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Orders",
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Products",
        key: "id",
      },
    },
    qty: DataTypes.INTEGER,
    // price: DataTypes.DECIMAL(10, 2), //delete
  });

  Detail.associate = function (models) {
    Detail.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });
    Detail.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  };
  return Detail;
};
