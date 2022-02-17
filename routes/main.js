const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
// create application/json parser
const jsonParser = bodyParser.json();

router.get("/", jsonParser, function (req, res) {
  res.send("Welcome to Grandeur, the app is running!");
});

module.exports = router;
