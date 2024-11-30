const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
  } catch (error) {
    throw new error({ msg: "DB connection failed !!!", error });
  }
};

module.exports = { connectDB };
