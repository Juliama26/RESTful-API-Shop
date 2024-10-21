const router = require("express").Router();
const {
  getCategorys,
  getCategoryId,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controller/category.controller");
const jwt = require("../middleware/jwt");

router.get("/", getCategorys);
router.get("/:id", getCategoryId);
router.post("/", jwt, postCategory);
router.patch("/:id", jwt, patchCategory);
router.delete("/:id", jwt, deleteCategory);

module.exports = router;
