const router = require("express").Router();

const {
  getUsers,
  getUserId,
  patchUser,
  deleteUser,
} = require("../controller/user.controller");
const jwt = require("../middleware/jwt");
const { upload } = require("../middleware/media.handling");

router.get("/", getUsers);
router.get("/:id", getUserId);
router.patch("/:id", jwt, upload.single("image_url"), patchUser);
router.delete("/:id", jwt, deleteUser);

module.exports = router;
