const { Order, User } = require("../models");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
    });
    return res.status(200).json({ message: "success", data: orders });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderId = async (req, res) => {
  try {
    const result = await Order.findOne({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json({ message: "success", data: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postOrder = async (req, res) => {
  const { total_amount } = req.body;
  try {
    const order = await Order.create(
      { total_amount, user_id: req.user.id },
      {
        include: [{ model: User, as: "user" }],
      }
    );
    return res.status(200).json({ message: "success", data: order });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const patchOrder = async (req, res) => {
  const { status, total_amount } = req.body;
  try {
    const order = await Order.findOne({ where: { id: req.params.id } });
    if (!order) return res.status(404).json({ message: "Order not found" });
    await Order.update(
      { status, total_amount },
      { where: { id: req.params.id } }
    );
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const response = await Order.findOne({ where: { id: req.params.id } });
    if (!response) return res.status(404).json({ message: "Order not found" });
    await Order.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getOrders,
  getOrderId,
  postOrder,
  patchOrder,
  deleteOrder,
};
