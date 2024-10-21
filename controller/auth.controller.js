const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  const { name, email, password, phone, address, image_url } = req.body;
  try {
    const existEmail = await User.findOne({ where: { email } });
    if (existEmail)
      return res.status(400).json({ message: "Email already exist" });
    const hashPassword = await bcrypt.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      image_url,
    });
    return res.status(200).json({ message: "success", data: user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });
    const match = await bcrypt.compareSync(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const accessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        user_role: user.user_role,
        phone: user.phone,
        address: user.address,
        image_url: user.image_url,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "25s",
      }
    );
    const refreshToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        user_role: user.user_role,
        phone: user.phone,
        address: user.address,
        image_url: user.image_url,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await User.update(
      {
        refresh_token: refreshToken,
      },
      { where: { id: user.id } }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    return res.status(200).json({ refreshToken, accessToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const Whoami = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({
      message: "success",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        user_role: user.user_role,
        phone: user.phone,
        address: user.address,
        image_url: user.image_url,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const Logout = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const refreshToken = jwt.verify(token, process.env.JWT_SECRET);
    await User.update(
      {
        refresh_token: null,
      },
      { where: { id: refreshToken.id } }
    );
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  Register,
  Login,
  Whoami,
  Logout,
};
