require("dotenv").config();
require("./mongo");

const express = require("express");
const app = express();
const cors = require("cors");
const Categorie = require("./models/Categorie");
const Exercise = require("./models/Exercise");

app.use(cors());
app.use(express.json());

let categories = [];

let exercises = [];

app.get("/", (req, res) => {
  res.send("<h1>Welcome!</h1>");
});

app.get("/categories", (req, res) => {
  Categorie.find({}).then((categories) => {
    res.json(categories);
  });
});

app.get("/exercises", (req, res) => {
  Exercise.find({}).then((exercises) => {
    res.json(exercises);
  });
});

/* app.get('/api/notes/:id', (req, res) => {
  const id  = (+req.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = [... notes, newNote]

  res.json(newNote)
})

app.delete('/api/notes/:id', (req, res) => {
  const id  = (+req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
}) */

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
