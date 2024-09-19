const express = require("express");

const app = express();
const PORT = 7777;

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling the route user 1");
    next();
    // res.send("1st Response");
  },
  (req, res, next) => {
    console.log("Handling the route user 2");
    // res.send("2nd Response !");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 3");
    // res.send("3nd Response !");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 4");
    // res.send("4nd Response !");
    next();
  }
);

app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
