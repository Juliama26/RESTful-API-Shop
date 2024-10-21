require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  secure: true,
});

const uploadCloud = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file);
    return result.secure_url;
  } catch (error) {
    console.log(`Something error`, error);
  } finally {
    fs.unlinkSync(file);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    let name = String(Date.now() + "-" + file.originalname);
    callback(null, name);
  },
});

const filter = (req, file, callback) => {
  try {
    if (["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)) {
      return callback(null, true);
    }
    return callback(null, false);
  } catch (error) {
    return callback(error, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filter });

module.exports = { upload, uploadCloud };
