import { useState, useEffect } from "react";
import exerciseService from "./services/exercises";

import "./App.css";
function App() {
  const [exercise, setExercises] = useState([]);

  useEffect(() => {
    exerciseService.getExercises().then((ejercicios) => {
      setExercises(ejercicios);
    });
  }, []);
  console.log(exercise);

  return (
    <>
      <h1>Lista de Ejercicios</h1>
      <ul>
        {exercise.map((e) => (
          <li key={e.id}>
            {e.name} series:{e.series} repes:{e.repes} rir:{e.rir}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
