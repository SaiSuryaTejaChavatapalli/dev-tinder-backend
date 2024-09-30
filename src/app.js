const express = require("express");
const connectToDB = require("./config/database");
const User = require("./models/user");

const app = express();
const PORT = 7777;

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Sai",
    lastName: "Ch",
    emailId: "sst@gmail.com",
    gender: "Male",
    age: 24,
  });

  try {
    await user.save();
    res.send("User Registered Successfully");
  } catch (error) {
    res.status(400).send("User Registration Failed" + error);
  }
});

connectToDB()
  .then(() => {
    console.log("DB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server Started on PORT ${PORT}`);
    });
  })
  .catch(() => {
    console.log("DB Connection Failed");
  });
