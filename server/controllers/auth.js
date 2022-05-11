const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const sendmail = require("../middlewares/sendEmail");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};

//User register
exports.register = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, phoneNumber } = req.body;
    // validation
    if (!name) return res.status(400).send("Name is required");
    if (!email) return res.status(400).send("Email is required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long");
    }
    let userExist = await User.findOne({ email });
    if (userExist) return res.status(400).send("Email is taken");

    // hash password
    let hashedPassword;
    hashedPassword = await bcrypt.hash(password, 8);

    //GENERATE OTP
    const OTP = Math.floor(100000 + Math.random() * 900000);

    //mail body
    const body = `Hi Here is OTP ${OTP} for email verification`;

    // register
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      otp: OTP,
    });
    await user.save();
    await sendmail(email, body);
    return res.json({
      ok: true,
      message: `OTP has been sent to ${email}`,
      email,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error. Try again.");
  }
};

//user email verification
exports.verifyEmail = async (req, res, next) => {
  try {
    const { email, verificationCode } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email does not exist" });
    }
    if (user.otp !== verificationCode) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification code" });
    }
    user.isEmailVerified = "Yes"; //verified
    user.otp = "";
    await user.save();
    return res.status(200).json({
      success: true,
      message:
        "Email verified successfully.Please Login with email and password",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//User Login
exports.login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("No user found");
    // check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send("Wrong Credentials");

    // create signed jwt
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // return user and token to client, exclude hashed password
    user.password = undefined;
    user.token = token;
    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // only works on https
    });
    // send user as json response
    res
      .status(200)
      .json({ success: true, user, token, message: "Logged in succesfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

//User Logout
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Signout success" });
  } catch (err) {
    console.log(err);
  }
};

//User forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const OTP = Math.floor(100000 + Math.random() * 900000);
    const body = `Hi Here is OTP ${OTP} for reset password`;

    const user = await User.findOneAndUpdate(
      { email },
      { otp: OTP },
      { new: true }
    );
    if (!user) return res.status(400).send("User not found");

    await sendmail(email, body);

    return res.json({
      ok: true,
      message: `Reset password code has been sent to ${email}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error.try again later" });
  }
};

//User Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    // console.table({ email, code, newPassword });
    const hashedPassword = await bcrypt.hash(newPassword, 8);

    const user = await User.findOne({ email });

    if (user.otp !== code) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification code" });
    }
    user.password = hashedPassword;
    user.otp = "";
    await user.save();

    res.json({ ok: true, message: "password has been updated successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

//Update user password
exports.updatePassword = async (req, res) => {
  try {
    const { email } = req.body;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email });
    const isCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid old password" });
    }
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 15);
    user.password = hashedPassword;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
