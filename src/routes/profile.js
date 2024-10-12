const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validate");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json({ message: "Data fetched successfully", data: user });
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((item) => {
      loggedInUser[item] = req.body[item];
    });

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, Your profile is updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

module.exports = profileRouter;
