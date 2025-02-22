import axios from "axios";

const baseUrl = "http://localhost:3001/routines";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getRoutine = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

export default { getRoutine, setToken };