const Driver = require("../models/driver.model");

const createDriver = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  const driver = await Driver.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
    vehicle: { color, plate, capacity, vehicleType },
  });

  return driver;
};

module.exports = { createDriver };
