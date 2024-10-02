const express = require("express");
const connectToDB = require("./config/database");
const User = require("./models/user");

const app = express();
const PORT = 7777;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Registered Successfully");
  } catch (error) {
    res.status(400).send("User Registration Failed" + error);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// GET data of the user
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }

    // const userEmail = req.body.emailId;
    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("User not found");
    // } else {
    //   res.send(users);
    // }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// DELETE data of the user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// UPDATE data of the user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  // It will ignore the fields the which is not part of Schema (userId)
  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });

    res.send("User Updated Successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
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
