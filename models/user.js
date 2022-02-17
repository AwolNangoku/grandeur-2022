const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("../app/db");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    emailAddress: { type: String, unique: true },
    mobileNumber: String,
    idNumber: { type: String, unique: true },
    password: String,
    timestamp: { type: Date, default: Date.now },
  },
  { strict: false }
);

/**Encrypt password before saving into the database */
userSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

/**This compares a hashed password with the one the user would be signing in with */
userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(!isMatch);
    } else {
      return callback(isMatch);
    }
  });
};

const UserModel = model("User", userSchema);

module.exports = UserModel;
