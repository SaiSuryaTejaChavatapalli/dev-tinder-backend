const mongoose = require("mongoose");

require("dotenv").config();

const connectToDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PWD}@namastenode.np3wu.mongodb.net/devTinder`
  );
};

module.exports = connectToDB;
