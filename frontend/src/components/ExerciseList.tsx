import { useEffect, useState } from "react";

const ExerciseList = ({exercise}) => {

  if (!exercise) {
    return "No hay ejercicios que mostrar";
  }

  return (
    <>
      <h1>Lista de Ejercicios</h1>
      <ul>
        {exercise.map((e) => (
          <li key={e.id}>
            <strong>{e.name} </strong>
            series:{e.series} repes:{e.repes} rir:{e.rir}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ExerciseList;
