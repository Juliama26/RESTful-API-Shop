const bcrypt = require("bcrypt");
const { User } = require("../models");
const { uploadCloud } = require("../middleware/media.handling");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ message: "success", data: users });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserId = async (req, res) => {
  try {
    const result = await User.findOne({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "success", data: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const patchUser = async (req, res) => {
  const { name, email, password, user_role, phone, address } = req.body;
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (email && email !== user.email) {
      const existEmail = await User.findOne({ where: { email } });
      if (existEmail)
        return res.status(400).json({ message: "Email already exist" });
    }
    const hashPassword = password
      ? await bcrypt.hashSync(password, 10)
      : user.password;

    const url = req.file ? await uploadCloud(req.file.path) : null;

    await User.update(
      {
        name,
        email,
        password: hashPassword,
        user_role,
        phone,
        address,
        image_url: url,
      },
      { where: { id: req.params.id } }
    );
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await User.findOne({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ message: "User not found" });
    await User.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUsers,
  getUserId,
  patchUser,
  deleteUser,
};
