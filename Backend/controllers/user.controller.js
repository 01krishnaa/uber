const User = require("../models/user.model");
const { validationResult } = require("express-validator");
const { createUser } = require("../services/user.service");

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

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

module.exports = { registerUser };
