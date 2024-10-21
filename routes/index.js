const router = require("express").Router();
const auth = require("./auth.route");
const user = require("./user.route");
const order = require("./order.route");
const item = require("./order.item.route");
const product = require("./product.route");
const category = require("./category.route");
const jwt = require("../middleware/jwt");

router.use("/auth", auth);
router.use("/item", jwt, item);
router.use("/user", user);
router.use("/order", order);
router.use("/product", product);
router.use("/category", category);

module.exports = router;
