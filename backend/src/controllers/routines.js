const express = require("express");
const Routine = require("../models/Routine");
const User = require("../models/User");
const routinesRouter = express.Router();
const jwt = require("jsonwebtoken");

// Obtener usuario desde el token

const getUserFromToken = async (req) => {
  try {
    const authorization = req.get("authorization");
    if (!authorization || !authorization.toLowerCase().startsWith("bearer")) {
      throw new Error("Token faltante o inválido");
    }

    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 

    if (!decodedToken.id) {
      throw new Error("Token inválido");
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  } catch (error) {
    console.error("Error en getUserFromToken:", error.message);
    throw new Error("No autorizado");
  }
};




// Obtener la rutina del usuario autenticado
routinesRouter.get("/", async (req, res) => {
  try {
    const user = await getUserFromToken(req);

    const routine = await Routine.findOne({ user: user._id })
      .populate("days.lunes days.martes days.miercoles days.jueves days.viernes days.sabado days.domingo");

    if (!routine) {
      return res.status(404).json({ message: "No tienes una rutina asignada" });
    }

    res.json(routine);
  } catch (error) {
    console.error("Error fetching user's routine:", error);
    res.status(401).json({ error: error.message });
  }
});



// Crear una nueva rutina

routinesRouter.post("/", async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "El nombre de la rutina es obligatorio" });
    }

    // Verificar si el usuario ya tiene una rutina 
    const existingRoutine = await Routine.findOne({ user: user._id });
    if (existingRoutine) {
      return res.status(400).json({ error: "Ya tienes una rutina creada" });
    }

    const newRoutine = new Routine({
      name,
      days: { lunes: [], martes: [], miercoles: [], jueves: [], viernes: [], sabado: [], domingo: [] },
      user: user._id
    });

    const savedRoutine = await newRoutine.save();

    user.routine = savedRoutine._id;
    await user.save();

    res.status(201).json(savedRoutine);
  } catch (error) {
    console.error("Error adding routine:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Agregar un ejercicio a un día específico de la rutina
routinesRouter.put("/add-exercise", async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    const { day, exerciseId } = req.body;

    if (!day || !exerciseId) {
      return res.status(400).json({ error: "Día y ejercicio son requeridos" });
    }

    // Verifica si el dia ingresado es valido
    const validDays = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    if (!validDays.includes(day)) {
      return res.status(400).json({ error: "Día inválido" });
    }

    const routine = await Routine.findOne({ user: user._id });
    if (!routine) {
      return res.status(404).json({ error: "No tienes una rutina" });
    }

    // Validar si el ejercicio existe antes de agregarlo
    const exerciseExists = await Exercise.findById(exerciseId);
    if (!exerciseExists) {
      return res.status(400).json({ error: "Ejercicio no encontrado" });
    }

    routine.days[day].push(exerciseId);
    await routine.save();

    res.json({ message: "Ejercicio añadido con éxito", routine });
  } catch (error) {
    console.error("Error adding exercise to routine:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar un ejercicio de un día específico
routinesRouter.put("/remove-exercise", async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    const { day, exerciseId } = req.body;

    if (!day || !exerciseId) {
      return res.status(400).json({ error: "Día y ejercicio son requeridos" });
    }

    const routine = await Routine.findOne({ user: user._id });
    if (!routine) {
      return res.status(404).json({ error: "No tienes una rutina" });
    }

    if (!routine.days[day]) {
      return res.status(400).json({ error: "Día inválido" });
    }

    routine.days[day] = routine.days[day].filter(id => id.toString() !== exerciseId);
    await routine.save();

    res.json({ message: "Ejercicio eliminado con éxito", routine });
  } catch (error) {
    console.error("Error removing exercise from routine:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//  Eliminar toda la rutina del usuario
routinesRouter.delete("/", async (req, res) => {
  try {
    const user = await getUserFromToken(req);

    const deletedRoutine = await Routine.findOneAndDelete({ user: user._id });
    if (!deletedRoutine) {
      return res.status(404).json({ error: "No tienes una rutina para eliminar" });
    }

    user.routine = null;
    await user.save();

    res.json({ message: "Rutina eliminada con éxito" });
  } catch (error) {
    console.error("Error deleting routine:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


module.exports = routinesRouter;