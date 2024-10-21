const router = require("express").Router();

const {
  getItems,
  getItemId,
  postItem,
  patchItem,
  deleteItem,
} = require("../controller/order.item.controller");

router.get("/", getItems);
router.post("/", postItem);
router.get("/:id", getItemId);
router.patch("/:id", patchItem);
router.delete("/:id", deleteItem);

module.exports = router;
