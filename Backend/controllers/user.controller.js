const User = require("../models/user.model");
const { validationResult } = require("express-validator");
const { createUser } = require("../services/user.service");
const BlacklistToken = require("../models/blacklistToken.model");

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const isUserAlreadyExist = await User.findOne({ email });

    if (isUserAlreadyExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await User.hashPassword(password);

    const user = await createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashPassword,
    });

    const token = await user.generateAuthToken();

    res.json({ msg: "User registered", user, token });
  } catch (error) {
    res.status(400).json({
      msg: "User did not register",
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json("Invalid email or password");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json("Invalid pass");
    }

    const token = await user.generateAuthToken();

    res.cookie("token", token);

    res.json({ msg: "User logged in", user, token });
  } catch (error) {
    res.status(400).json({
      msg: "User login failed",
      error,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({
      msg: "User does not exists",
      error,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
  
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await BlacklistToken.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    res.status(400).json({
      msg: "Logout failed",
      error,
    });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, logoutUser };
