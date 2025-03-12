const ExerciseList = ({ exercise }) => {
  if (!exercise || exercise.length === 0) {
    return <p>No hay ejercicios que mostrar</p>;
  }

  const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  return (
    <>
      <h1>Rutina Semanal</h1>
      {daysOfWeek.map((day) => (
        <div key={day}>
          <h2>{day.charAt(0).toUpperCase() + day.slice(1)}</h2>
          <ul>
            {exercise[day] && exercise[day].length > 0 ? (
              exercise[day].map((e) => (
                <li key={e.id}>
                  <strong>{e.name}</strong> - Series: {e.series}, Reps: {e.repes}, RIR: {e.rir}
                </li>
              ))
            ) : (
              <p>No hay ejercicios asignados</p>
            )}
          </ul>
        </div>
      ))}
    </>
  );
};


export default ExerciseList;
