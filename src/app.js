const express = require("express");

const PORT = 3000;
const app = express();

// app.use("/test", (req, res) => {
//   res.send("Hello from the server!");
// });

app.get("/user", (req, res) => {
  res.send({ firstName: "Sai Surya Teja", lastName: "Chavatapalli" });
});

app.post("/user", (req, res) => {
  res.send("Posted Successfully!");
});
app.put("/user", (req, res) => {
  res.send("Updated Successfully!");
});
app.delete("/user", (req, res) => {
  res.send("Deleted Successfully!");
});

app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
