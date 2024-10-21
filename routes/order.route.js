const router = require("express").Router();

const {
  getOrders,
  getOrderId,
  postOrder,
  patchOrder,
  deleteOrder,
} = require("../controller/order.controller");
const jwt = require("../middleware/jwt");

router.get("/", getOrders);
router.post("/", jwt, postOrder);
router.get("/:id", getOrderId);
router.patch("/:id", jwt, patchOrder);
router.delete("/:id", jwt, deleteOrder);

module.exports = router;
