import axios from "axios";
const baseUrl = "http://localhost:3001/exercises";

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getExercises = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createExercise = async (newExercise) => {

  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(baseUrl, newExercise, config);
  return response.data;
};

export default { getExercises, createExercise, setToken };
