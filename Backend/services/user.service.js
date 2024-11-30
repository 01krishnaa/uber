const User = require("../models/user.model");

const createUser = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = await User.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
  });

  return user;
};

module.exports = { createUser };
