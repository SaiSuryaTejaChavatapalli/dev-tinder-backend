const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // const { token } = req.cookies;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send("Please Login");
    }
    const verifiedData = await jwt.verify(token, process.env.ACCESS_SECRET);
    const user = await User.findById(verifiedData._id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        message: "Unauthorized! Access Token was expired!",
      });
    }
    console.log(error);
    res.status(400).send("ERROR:" + error.message);
  }
};

module.exports = { userAuth };
