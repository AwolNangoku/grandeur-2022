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
      emailAddress: req.body.emailAddress,
      mobileNumber: req.body.mobileNumber,
      idNumber: req.body.idNumber,
      password: req.body.password,
      bio: req.body.bio,
    });
    await user
      .save()
      .then((savedUser) => {
        res.status(201).send({
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

router.get("/user/:userId", jsonParser, function (req, res) {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      console.log("1. Failed finding user from the database");
      res.status(400).send({ message: error });
    });
});

module.exports = router;
