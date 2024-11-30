const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Token not found" });
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);

    const user = await User.findOne({ _id: decodedToken.id });
    console.log(user);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json("Unauthorized");
  }
};

module.exports = authUser;
