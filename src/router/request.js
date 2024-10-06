const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();

requestRouter.post("/connectionRequest", userAuth, (req, res) => {
  res.send("Connection Request sent by " + req.user.firstName);
});

module.exports = requestRouter;
