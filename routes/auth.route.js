const router = require("express").Router();
const {
  Login,
  Register,
  Whoami,
  Logout,
} = require("../controller/auth.controller");
const jwt = require("../middleware/jwt");

router.post("/login", Login);
router.post("/register", Register);
router.get("/whoami", jwt, Whoami);
router.delete("/logout", jwt, Logout);

module.exports = router;
