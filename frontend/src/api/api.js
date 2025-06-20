import axios from "axios";

const URL_BASE = process.env.API_URL_BASE;

const obtenerAlojamientos = async (filtrosBusqueda, numeroPagina) => {
  try {
    const response = await axios.get(`${URL_BASE}/alojamientos`,{
      params: {}
    })
  } catch (error) {
  }
}

export default obtenerAlojamientos;