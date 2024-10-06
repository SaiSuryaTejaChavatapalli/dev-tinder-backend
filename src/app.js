const express = require("express");
const cookeParser = require("cookie-parser");

const connectToDB = require("./config/database");
const authRouter = require("./router/auth");
const requestRouter = require("./router/request");
const profileRouter = require("./router/profile");

const app = express();
const PORT = 7777;

app.use(express.json());
app.use(cookeParser());

app.use("/", authRouter, requestRouter, profileRouter);

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
