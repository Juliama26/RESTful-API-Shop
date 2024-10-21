"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "id",
      },
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    stock: DataTypes.INTEGER,
    image_url: DataTypes.ARRAY(DataTypes.STRING),
  });
  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
    Product.hasMany(models.Detail, {
      foreignKey: "product_id",
      as: "detail",
    });
  };

  return Product;
};
