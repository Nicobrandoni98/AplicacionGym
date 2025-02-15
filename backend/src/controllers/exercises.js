const express = require("express");
const Exercise = require("../models/Exercise");
const Categorie = require("../models/Categorie");
const exercisesRouter = express.Router();

// Obtener todos los ejercicios
exercisesRouter.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find({});
    res.json(exercises);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Crear un nuevo ejercicio
exercisesRouter.post("/", async (req, res) => {
  try {
    const { name, series, repes, categorie, rir } = req.body;

    if (!name || !series || !repes /* || !categorie */ || !rir) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingCategorie = await Categorie.findById(categorie);
    if (!existingCategorie) {
      return res.status(400).json({ error: "Category not found" });
    }

    const newExercise = new Exercise({ name, series, repes, categorie, rir });
    const savedExercise = await newExercise.save();

    existingCategorie.exercises.push(savedExercise._id);
    await existingCategorie.save();

    res.status(201).json(savedExercise);
  } catch (error) {
    console.error("Error adding exercise:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = exercisesRouter;
