const express = require("express");
const loginRouter = express.Router(); // Asegúrate de que esto está presente
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !passwordCorrect) {
    res.status(401).json({
      error: "Invalid user or password",
    });
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userForToken, '123') // El '123' tengo que ponerlo en una variable de entorno (.env)

  res.send({
    name: user.name,
    username: user.username,
    token
  });
});

module.exports = loginRouter;
