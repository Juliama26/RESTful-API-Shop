const router = require("express").Router();
const {
  getProducts,
  postProduct,
  getProductId,
  patchProduct,
  deleteProduct,
} = require("../controller/product.controller");
const jwt = require("../middleware/jwt");
const { upload } = require("../middleware/media.handling");

router.get("/", getProducts);
router.post("/", jwt, upload.array("image_url"), postProduct);
router.get("/:id", getProductId);
router.patch("/:id", jwt, patchProduct);
router.delete("/:id", jwt, deleteProduct);

module.exports = router;
