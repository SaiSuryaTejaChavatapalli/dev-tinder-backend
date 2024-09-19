const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();
const PORT = 7777;

app.use("/admin", adminAuth);

app.get("/admin", (req, res, next) => {
  console.log("Admin3");
  res.send("Success");
});
app.get("/admin/test", (req, res, next) => {
  console.log("Admin3");
  next();
});

app.get("/user/data", userAuth, (req, res) => {
  console.log("User data is called");
  res.send("USER data");
});
app.get("/user/login", (req, res) => {
  console.log("User login is called");
  res.send("USER Loggedin successfully!");
});

app.use("/fun", (req, res, next) => {
  console.log("Fun1 is called");
  next();
});
app.get("/fun/1", (req, res) => {
  console.log("Fun2 is called");
});

app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
