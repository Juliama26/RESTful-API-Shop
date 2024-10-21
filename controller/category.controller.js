const { Category } = require("../models");

const getCategorys = async (req, res) => {
  try {
    const category = await Category.findAll();
    return res.status(200).json({ message: "success", data: category });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCategoryId = async (req, res) => {
  try {
    const result = await Category.findOne({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ message: "Category not found" });
    return res.status(200).json({ message: "success", data: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postCategory = async (req, res) => {
  try {
    const response = await Category.findOne({ where: { name: req.body.name } });
    if (response)
      return res.status(400).json({ message: "Category already exists" });
    const category = await Category.create({ ...req.body });
    return res.status(200).json({ message: "success", data: category });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const patchCategory = async (req, res) => {
  try {
    const response = await Category.findOne({ where: { id: req.params.id } });
    if (!response)
      return res.status(404).json({ message: "Category not found" });
    const category = await Category.findOne({ where: { name: req.body.name } });
    if (category)
      return res.status(400).json({ message: "Category already exists" });
    await Category.update({ ...req.body }, { where: { id: req.params.id } });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const response = await Category.findOne({ where: { id: req.params.id } });
    if (!response)
      return res.status(404).json({ message: "Category not found" });
    await Category.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getCategorys,
  getCategoryId,
  postCategory,
  patchCategory,
  deleteCategory,
};
