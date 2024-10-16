const express = require("express");
const bcrypt = require("bcrypt");
const { validateSignup } = require("../utils/validate");
const User = require("../models/user");

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
    const token = savedUser.getJWT();
    res.cookie("token", token, {});
    res.json({ message: "User Registered Successfully", data: savedUser });
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
      const token = user.getJWT();
      res.cookie("token", token, {});
      res.json({ message: "Login Successful", data: user });
    }
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.clearCookie("token").send("Logout Successful!");
});

authRouter.post("/forgotPassword", async (req, res) => {
  const { currentPassword, newPassword, emailId } = req.body;
});

module.exports = authRouter;
