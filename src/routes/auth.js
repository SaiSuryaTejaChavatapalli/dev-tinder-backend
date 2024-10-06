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
    await user.save();
    res.send("User Registered Successfully");
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
    const isPasswordCorrect = user.validatePassword(password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    } else {
      const token = user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000),
      });
      res.send("Login Success");
    }
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.clearCookie("token").send("Logout Successful!");
});

module.exports = authRouter;
