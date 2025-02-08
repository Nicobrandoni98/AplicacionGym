require("dotenv").config();
require("./mongo");

const express = require("express");
const cors = require("cors");

const app = express();

// Importar Rutas
const usersRouter = require("./controllers/users");
const categoriesRouter = require("./controllers/categories");
const exercisesRouter = require("./controllers/exercises");
const routinesRouter = require("./controllers/routines");
const loginRouter = require("./controllers/login");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome!</h1>");
});

// Usar Rutas
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/exercises", exercisesRouter);
app.use("/routines", routinesRouter);
app.use("/login", loginRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
