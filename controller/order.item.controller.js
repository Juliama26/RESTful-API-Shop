const { Detail, Order, Product } = require("../models");

const getItems = async (req, res) => {
  try {
    const items = await Detail.findAll();
    return res.status(200).json({ message: "success", data: items });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getItemId = async (req, res) => {
  try {
    const result = await Detail.findOne({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ message: "Item not found" });
    return res.status(200).json({ message: "success", data: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postItem = async (req, res) => {
  const { order_id, product_id, qty } = req.body;
  try {
    const order = await Order.findOne({ where: { id: order_id } });
    const product = await Product.findOne({ where: { id: product_id } });
    if (!order || !product)
      return res.status(404).json({ message: "Order or product not found" });
    const newItem = await Detail.create({
      order_id,
      product_id,
      qty,
    });
    return res.status(201).json({ message: "success", data: newItem });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const patchItem = async (req, res) => {
  const { qty } = req.body;
  try {
    const response = await Detail.findOne({ where: { id: req.params.id } });
    if (!response) return res.status(404).json({ message: "Item not found" });
    if (qty <= 0) return res.status(400).json({ message: "Invalid qty" });
    if (qty > response.product.stock)
      return res.status(400).json({ message: "Not enough stock" });
    await Detail.update({ qty }, { where: { id: req.params.id } });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const response = await Detail.findOne({ where: { id: req.params.id } });
    if (!response) return res.status(404).json({ message: "Item not found" });
    await Detail.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getItems,
  getItemId,
  postItem,
  patchItem,
  deleteItem,
};
