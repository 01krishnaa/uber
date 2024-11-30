const Driver = require("../models/driver.model");
const { validationResult } = require("express-validator");
const { createDriver } = require("../services/driver.service");
const BlacklistToken = require("../models/blacklistToken.model");

const registerDriver = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const isDriverAlreadyExist = await Driver.findOne({ email });

    if (isDriverAlreadyExist) {
      return res.status(400).json({ message: "Driver already exists" });
    }

    const hashPassword = await Driver.hashPassword(password);

    console.log({ fullName, email, password, vehicle });

    const driver = await createDriver({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    console.log(driver);

    const token = driver.generateAuthToken();

    res.status(201).json({ token, driver });
  } catch (error) {
    res.status(400).json({
      msg: "Driver signup failed",
      error,
    });
  }
};

const loginDriver = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const driver = await Driver.findOne({ email }).select("+password");

    if (!driver) {
      return res.status(400).json("Invalid email or password");
    }

    const isPasswordValid = await driver.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json("Invalid pass");
    }

    const token = await driver.generateAuthToken();

    res.cookie("token", token);

    res.json({ msg: "Driver logged in", driver, token });
  } catch (error) {
    res.status(400).json({
      msg: "Driver login failed",
      error,
    });
  }
};

const getDriverProfile = async (req, res) => {
  try {
    res.status(200).json(req.driver);
  } catch (error) {
    res.status(400).json({
      msg: "Driver does not exists",
      error,
    });
  }
};

const logoutDriver = async (req, res) => {
  try {
      
      const token = req.cookies.token || req.headers.authorization.split(" ")[1];
      console.log(token)
      
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

module.exports = {
  registerDriver,
  loginDriver,
  getDriverProfile,
  logoutDriver,
};
