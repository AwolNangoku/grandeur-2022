const express = require("express");
const app = express();
const cors = require("cors");

const homeRoute = require("../routes/main");
const userRoute = require("../routes/account");
const addressRoute = require("../routes/address");
const profilePictureRoute = require("../routes/bucket");

app.use(cors());

app.use("/", homeRoute);
app.use("/account", userRoute);
app.use("/address", addressRoute);
app.use("/bucket", profilePictureRoute);

module.exports = app;
