import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL_BASE;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email: email,
      password: password
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}