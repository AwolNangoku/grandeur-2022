const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");

const User = require("../models/user");

const router = express.Router();

// create application/json parser
const jsonParser = bodyParser.json();

router.use(jsonParser);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/data/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ dest: "uploads/" });

router.post(
  "/upload-profile/:userId",
  upload.single("uploaded_file"),
  function (req, res) {
    console.log("Received file" + req.file.originalname);
    var src = fs.createReadStream(req.file.path);
    var dest = fs.createWriteStream("uploads/" + req.file.originalname);
    src.pipe(dest);
    src.on("end", function () {
      fs.readFile(
        `./uploads/${req.file.originalname}`,
        "base64",
        async (err, base64Image) => {
          if (err) {
            res.status(401).send({ message: "Failed reading file" });
          }
          User.findByIdAndUpdate(
            { _id: req.params.userId },
            {
              profileUrl: `data:image/jpeg;base64;${base64Image}`,
            }
          )
            .then((updatedUser) => {
              console.log("SENDING BACK---", updatedUser);
              res.send({
                message: "Successfully updated profile picture",
                status: true,
                user: updatedUser,
              });
            })
            .catch((error) => {
              console.log("1. Failed user profile update", error);
              res.status(400).send({
                message: "Failed updating user profile",
                status: false,
              });
            });
        }
      );
    });
    src.on("error", function (err) {
      res.json("Something went wrong!");
    });
  }
);

module.exports = router;
