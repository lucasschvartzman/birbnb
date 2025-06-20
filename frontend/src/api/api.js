import axios from "axios";

const API_BASE_URL = process.env.API_URL_BASE;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email: email,
      password: password
    });
    return response.data.id;
  } catch (error) {
    throw error;
  }
}