const express = require("express");

const PORT = 3000;
const app = express();

app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
