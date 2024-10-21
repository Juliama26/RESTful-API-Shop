const passport = require("./libs/jwt-strategy");

const jwt = passport.authenticate("jwt", { session: false });

module.exports = jwt;
