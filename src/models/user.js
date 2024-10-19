const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  ACCESS_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_SECRET,
  REFRESH_TOKEN_EXPIRY,
} = require("../../constants");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,

      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TgOv9CMmsUzYKCcLGWPvqcpUk6HXp2mnww&s",
    },
    about: {
      type: String,
      default: "This is a default about of the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getAccessToken = function () {
  const user = this;
  return jwt.sign({ _id: user._id }, ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

userSchema.methods.getRefreshToken = function () {
  const user = this;
  return jwt.sign({ _id: user._id }, REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  return await bcrypt.compare(passwordInputByUser, passwordHash);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
