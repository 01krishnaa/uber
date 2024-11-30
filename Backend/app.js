const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config();

app.use(cors());




app.listen(PORT, () => console.log(`Server started listening at ${PORT}`));
