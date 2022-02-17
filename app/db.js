const mongoose = require("mongoose");
require("dotenv").config();
const config = require("../config");

const {
  db: { port, url },
} = config(process.env.NODE_ENV);

const db = mongoose
  .connect(url)
  .then(() => console.log("connection established, listening to port", port))
  .catch((e) => console.log("Failed database connection", e));

module.exports = db;
