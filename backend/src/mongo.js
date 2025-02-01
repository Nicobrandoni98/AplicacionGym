const mongoose = require("mongoose");

const connectionString = `mongodb+srv://nicobrandoni98:123qwe@newgymproject.hf4tr.mongodb.net/?retryWrites=true&w=majority&appName=NewGymProject`;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
  });
