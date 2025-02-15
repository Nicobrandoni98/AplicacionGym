import axios from "axios";
const baseUrl = "http://localhost:3001/exercises";

const getExercises = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createExercise = async (newExercise) => {
  const response = await axios.post(baseUrl, newExercise);
  return response.data;
};

export default { getExercises, createExercise };
