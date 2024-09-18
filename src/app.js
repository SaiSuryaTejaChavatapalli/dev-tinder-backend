const express = require("express");

const PORT = 3000;
const app = express();

// This is called for all HTTP methods with '/mine' route(GET,POST,PUT,DELETE)
app.use("/mine", (req, res) => {
  res.send("Hello from the server!");
});

// Query Params
app.get("/test", (req, res) => {
  res.send(req.query.testId);
});

//Dynamic Route
app.get("/dynamic/:dynamicId", (req, res) => {
  res.send(req.params.dynamicId);
});

// Regex Routes
app.get(/hi/, (req, res) => {
  res.send("This is called for routes with 'hi' in it, as it has regex");
});

app.get("/ab*c", (req, res) => {
  res.send("This is called route staring with 'ab' and ending with 'c'");
});

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
