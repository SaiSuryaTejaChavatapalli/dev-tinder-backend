const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");

const userRouter = express.Router();

const USER_SAFE_DATA = ["firstName", "lastName", "photoUrl", "age", "skills"];

//Get All the pending connection requests for loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // ref and populate are like JOINS in SQL
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((request) => request.fromUserId);
    res.json({
      message: "Data fetched Successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({ message: "ERROR:" + error.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", USER_SAFE_DATA);
    const data = connectionRequests.map((request) => request.fromUserId);

    res.json({ message: "Data fetched Successfully", data });
  } catch (error) {
    res.status(400).json({ message: "ERROR:" + error.message });
  }
});

module.exports = userRouter;
