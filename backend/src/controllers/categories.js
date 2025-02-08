const express = require("express");
const Categorie = require("../models/Categorie");
const categorieRouter = express.Router();

// Obtener todas las categorías
categorieRouter.get("/", async (req, res) => {
  try {
    const categories = await Categorie.find({});
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Crear una nueva categoría
categorieRouter.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newCategorie = new Categorie({ name });
    const savedCategorie = await newCategorie.save();
    res.status(201).json(savedCategorie);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = categorieRouter;
