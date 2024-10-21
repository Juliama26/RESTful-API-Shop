const { Product, Category } = require("../models");
const { uploadCloud } = require("../middleware/media.handling");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({ message: "success", data: products });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProductId = async (req, res) => {
  try {
    const result = await Product.findOne({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "success", data: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postProduct = async (req, res) => {
  const { name, stock, price, description, category_id } = req.body;
  try {
    const category = await Category.findOne({ where: { id: category_id } });
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    let url = [];
    if (req.files && req.files.length > 0) {
      const image = req.files.map((file) => uploadCloud(file.path));
      url = await Promise.all(image);
    }

    const product = await Product.create({
      name,
      stock,
      price,
      image_url: url,
      description,
      category_id,
    });
    return res.status(200).json({ message: "success", data: product });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const patchProduct = async (req, res) => {
  const { name, stock, price, description, category_id } = req.body;
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) return res.status(404).json({ message: "Product not found" });
    const category = await Category.findOne({ where: { id: category_id } });
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    let url = [];
    if (req.files && req.files.length > 0) {
      const image = req.files.map((file) => uploadCloud(file.path));
      url = await Promise.all(image);
    }

    await Product.update(
      {
        name,
        stock,
        price,
        image_url: url,
        description,
        category_id,
      },
      { where: { id: req.params.id } }
    );
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await Product.findOne({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ message: "Product not found" });
    await Product.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getProducts,
  postProduct,
  getProductId,
  patchProduct,
  deleteProduct,
};
