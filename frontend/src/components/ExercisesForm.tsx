import { useState, useEffect } from "react";
import exerciseService from "../services/exercises.ts";
import categoryService from "../services/categories.ts";

const ExercisesForm = ({ setExercises, handleLogOut }) => {
  const [categories, setCategories] = useState([]);
  const [exercises, setExercisesList] = useState([]); // Guardar todos los ejercicios
  const [filteredExercises, setFilteredExercises] = useState([]); // Guardar ejercicios filtrados por categoría
  const [newExercise, setNewExercise] = useState({
    name: "",
    repes: "",
    series: "",
    rir: "",
    categorie: "",
    exerciseId: "", // ID del ejercicio seleccionado
  });

  useEffect(() => {
    categoryService.getCategories().then((data) => {
      setCategories(data);
      console.log("Categorías cargadas:", data);
    });
  
    // Obtener todos los ejercicios
    exerciseService.getExercises().then((data) => {
      setExercisesList(data);
      setFilteredExercises(data); // Al principio mostrar todos los ejercicios
      console.log("Ejercicios cargados:", data);
    });
  }, []);
  

  const handleChange = (e) => {
    setNewExercise({
      ...newExercise,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    console.log("Categoría seleccionada:", selectedCategory);
  
    setNewExercise({
      ...newExercise,
      categorie: selectedCategory,  // Actualizamos la categoría seleccionada
    });
  
    // Filtrar ejercicios por categoría
    if (selectedCategory) {
      const filtered = exercises.filter((exercise) => {
        // Mostrar todos los valores involucrados
        console.log(
          "Ejercicio ID:", exercise.id,
          "Categoría ejercicio (original):", exercise.categorie,
          "Categoría seleccionada (original):", selectedCategory
        );
  
        // Convertir ambos valores a cadenas para asegurarnos de que la comparación es precisa
        const exerciseCategory = String(exercise.categorie);
        const selectedCategoryStr = String(selectedCategory);
  
        // Compara ambos valores (también verificamos que ambos no sean nulos o vacíos)
        console.log(
          `Comparando: ${exerciseCategory} === ${selectedCategoryStr}`
        );
  
        return exerciseCategory === selectedCategoryStr;
      });
  
      setFilteredExercises(filtered);
      console.log("Ejercicios filtrados:", filtered);
    } else {
      setFilteredExercises(exercises);
      console.log("Se muestran todos los ejercicios.");
    }
  };
  
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar que un ejercicio haya sido seleccionado
    if (!newExercise.exerciseId) {
      alert("Por favor, selecciona un ejercicio.");
      return;
    }

    const selectedExercise = exercises.find(
      (exercise) => exercise.id === newExercise.exerciseId
    );

    if (!selectedExercise) {
      alert("Ejercicio no válido.");
      return;
    }

    // Crear el nuevo ejercicio en la rutina
    const exerciseData = {
      ...selectedExercise,
      repes: newExercise.repes,
      series: newExercise.series,
      rir: newExercise.rir,
    };

    try {
      const addedExercise = await exerciseService.createExercise(exerciseData);
      setExercises((prevExercises) => [...prevExercises, addedExercise]);
      setNewExercise({
        name: "",
        repes: "",
        series: "",
        rir: "",
        categorie: "",
        exerciseId: "", // Reseteamos el ejercicio seleccionado
      });
    } catch (error) {
      console.error("Error adding exercise:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="repes"
          placeholder="Repes"
          value={newExercise.repes}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="series"
          placeholder="Series"
          value={newExercise.series}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="rir"
          placeholder="RIR"
          value={newExercise.rir}
          onChange={handleChange}
          required
        />

        {/* Select para elegir categoría */}
        <select onChange={handleCategoryChange} value={newExercise.categorie}>
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Select para elegir ejercicio */}
        <select
          onChange={(e) =>
            setNewExercise({ ...newExercise, exerciseId: e.target.value })
          }
          value={newExercise.exerciseId}
        >
          <option value="">Selecciona un ejercicio</option>
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))
          ) : (
            <option value="">No hay ejercicios disponibles</option>
          )}
        </select>

        <button type="submit">Agregar Ejercicio</button>
      </form>

      <div>
        <button onClick={handleLogOut}>Cerrar sesión</button>
      </div>
    </>
  );
};

export default ExercisesForm;
