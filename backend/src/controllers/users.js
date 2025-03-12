const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate({
    path: "routine",
    select: "-user",
    populate: {
      path: "exercises",
    },
  });
  res.json(users);
});
usersRouter.post("/", async (req, res) => {
  try {
    const { username, name, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, name, passwordHash });
    await user.save();

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = usersRouter;
