const dotenv = require("dotenv") || 4000;
dotenv.config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDB } = require("./config/db");
const userRouter = require("./routes/user.routes");
const driverRouter = require("./routes/driver.routes")
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/driver", driverRouter)

connectDB().then(() => {
  console.log("DB connected successfully");
  app.listen(PORT, () => console.log(`Server started listening at ${PORT}`));
});
