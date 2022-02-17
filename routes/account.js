const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/user");

const router = express.Router();
// create application/json parser
const jsonParser = bodyParser.json();

router.post("/register/", jsonParser, async function (req, res) {
  if (req.body) {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      emailAddress: req.body.email_address,
      mobileNumber: req.body.mobile_number,
      idNumber: req.body.idNumber,
      password: req.body.password,
    });
    await user
      .save()
      .then((savedUser) => {
        res.send({
          success: true,
          message: "Your account has been created successfully!",
          user: savedUser,
        });
      })
      .catch((error) => {
        console.log("Failed adding new user", error);
        res
          .status(400)
          .send({ success: false, message: "Failed creating user account" });
      });
  }
});

router.post("/login", jsonParser, async function (req, res) {
  const { username, password } = req.body;
  User.findOne({ emailAddress: username })
    .then((user) =>
      user.comparePassword(password, (passwordsMatched) =>
        passwordsMatched
          ? res.send({
              message: "Successfully logged in!",
              success: true,
              user,
            })
          : res.status(401).send({
              message: "Incorrect logins, please check your password.",
              success: false,
            })
      )
    )
    .catch((err) => {
      res.status(400).send({
        message: "Incorrect details, please check your username and password.",
        success: false,
      });
    });
});

module.exports = router;
