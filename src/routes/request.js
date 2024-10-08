const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // Allow only these two statuses for this send API
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type:" + status });
      }

      // Check if the connection request already exist from vice versa userIds
      const existingUser = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (existingUser) {
        return res
          .status(400)
          .send({ message: "Connection request already exit" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      res.json({
        message: "Connection Request Sent Successfully",
        data,
      });
    } catch (error) {
      res.status(400).send("ERROR:" + error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      // Validations
      const allowedStatus = ["accepted", "rejected"];
      const { status, requestId } = req.params;
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Status not allowed",
        });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request not valid" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      return res.json({
        message: "Connection request " + status + " successfully",
        data,
      });
    } catch (error) {
      res.status(400).json({ message: "ERROR:" + error.message });
    }
  }
);

module.exports = requestRouter;
