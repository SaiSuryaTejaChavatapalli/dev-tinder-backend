const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateSignup } = require("../utils/validate");
const User = require("../models/user");
const {
  REFRESH_SECRET,
  ACCESS_SECRET,
  ACCESS_TOKEN_EXPIRY,
  USER_SAFE_DATA,
} = require("../../constants");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  // Validate the request

  try {
    validateSignup(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    const savedUser = await user.save();
    const accessToken = savedUser.getAccessToken();
    const refreshToken = savedUser.getRefreshToken();
    res.cookie("refreshToken", refreshToken, {});
    res.json({
      message: "User Registered Successfully",
      data: savedUser,
      accessToken,
    });
  } catch (error) {
    res.status(400).send("User Registration Failed" + error);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordCorrect = await user.validatePassword(password);
    console.log("IsPasswordcorrect", isPasswordCorrect);
    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    } else {
      const accessToken = user.getAccessToken();
      const refreshToken = user.getRefreshToken();

      const userDataObj = {};
      Object.keys(user.toObject()).forEach((item) => {
        if (USER_SAFE_DATA.includes(item)) {
          userDataObj[item] = user[item];
        }
      });
      res.cookie("refreshToken", refreshToken, {});
      res.json({ message: "Login Successful", data: userDataObj, accessToken });
    }
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.clearCookie("refreshToken").send("Logout Successful!");
});

authRouter.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res.status(401).json({ message: "Unauthorized! Please Login!" });
  jwt.verify(refreshToken, REFRESH_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    // Issue a new access token

    const newAccessToken = jwt.sign({ _id: user._id }, ACCESS_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    const foundUser = await User.findOne({ _id: user._id });
    res.json({
      message: "Token refreshed successfully",
      data: foundUser,
      accessToken: newAccessToken,
    });
  });
});

module.exports = authRouter;
