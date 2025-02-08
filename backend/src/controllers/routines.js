const express = require("express");
const Routine = require("../models/Routine");
const User = require("../models/User");
const routinesRouter = express.Router();
const jwt = require("jsonwebtoken");

// Obtener todas las rutinas
routinesRouter.get("/", async (req, res) => {
  try {
    const routines = await Routine.find()
      .populate("exercises")
      .populate({ path: "user", select: "name username" });

    res.json(routines);
  } catch (error) {
    console.error("Error fetching routines:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Crear una nueva rutina

routinesRouter.post("/", async (req, res) => {
  try {
    const { name, exercises } = req.body;

    const authorization = req.get("authorization");

    let token = "";

    if (
      authorization &&
      authorization.toLocaleLowerCase().startsWith("bearer")
    ) {
      token = authorization.substring(7);
    }

    const decodedToken = jwt.verify(token, "123"); // lo mismo que en login, cambiar 123 por .env
    

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    if (!name || !Array.isArray(exercises)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { id: userId } = decodedToken;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newRoutine = new Routine({ name, exercises, user: user._id });
    const savedRoutine = await newRoutine.save();

    user.routine = user.routine.concat(savedRoutine._id);
    await user.save();

    res.status(201).json(savedRoutine);
  } catch (error) {
    console.error("Error adding routine:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Agregar ejercicios a una rutina existente
routinesRouter.put("/:id", async (req, res) => {
  try {
    const { exercises } = req.body;
    const { id } = req.params;

    if (!Array.isArray(exercises)) {
      return res.status(400).json({ error: "Exercises should be an array" });
    }

    const updatedRoutine = await Routine.findByIdAndUpdate(
      id,
      { $push: { exercises: { $each: exercises } } },
      { new: true }
    ).populate("exercises");

    if (!updatedRoutine) {
      return res.status(404).json({ error: "Routine not found" });
    }

    res.json(updatedRoutine);
  } catch (error) {
    console.error("Error updating routine:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = routinesRouter;
