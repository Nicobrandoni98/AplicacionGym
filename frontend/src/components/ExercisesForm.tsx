import { useState, useEffect, useRef } from "react";
import exerciseService from "../services/exercises.ts";
import categoryService from "../services/categories.ts";

const ExercisesForm = ({ setExercises, handleLogOut }) => {
  const [categories, setCategories] = useState([]);
  const [newExercise, setNewExercise] = useState({
    name: "",
    repes: "",
    series: "",
    rir: "",
    categorie: "",
  });

  useEffect(() => {
    categoryService.getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleChange = (e) => {
    setNewExercise({
      ...newExercise,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    // Actualizar el valor de la categoría seleccionada
    setNewExercise({
      ...newExercise,
      categorie: e.target.value, // Asignar el id de la categoría seleccionada
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar que una categoría válida haya sido seleccionada
    if (!newExercise.categorie) {
      alert("Por favor, selecciona una categoría válida.");
      return;
    }
    try {
      const addedExercise = await exerciseService.createExercise(newExercise);

      setExercises((prevExercises) => [...prevExercises, addedExercise]); // Agrega el nuevo ejercicio a la lista

      setNewExercise({
        name: "",
        repes: "",
        series: "",
        rir: "",
        categorie: "",
      }); // Resetea el formulario
    } catch (error) {
      console.error("Error adding exercise:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Exercise Name"
          value={newExercise.name}
          onChange={handleChange}
          required
        />
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

        <select onChange={handleCategoryChange} value={newExercise.categorie}>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit">Create Exercise</button>
      </form>
      <div>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </>
  );
};

export default ExercisesForm;
