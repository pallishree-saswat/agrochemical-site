const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  //get token from the header
  const token = req.header("Authorization");

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token , authorization denied" });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};
