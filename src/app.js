const express = require("express");
const cookeParser = require("cookie-parser");

const connectToDB = require("./config/database");
const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");
const cors = require("cors");

const app = express();
const PORT = 7777;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookeParser());

app.use("/", authRouter, requestRouter, profileRouter, userRouter);

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
