import axios from "axios";

const baseUrl = "http://localhost:3001/categories";

const getCategories = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getCategories };
