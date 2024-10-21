"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: DataTypes.STRING,
  });
  Category.associate = function (models) {
    Category.hasMany(models.Product, {
      foreignKey: "category_id",
      as: "products",
    });
  };

  return Category;
};
