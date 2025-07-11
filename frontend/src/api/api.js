import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL_BASE;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email: email,
      password: password
    });
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión: ', error);
    throw error;
  }
}

export const getAlojamientos = async (filtros = {}, paginacion = {}) => {
  try {
    const queryParameters = construirQueryParameters(filtros, paginacion);
    const response = await axios.get(`${API_BASE_URL}/alojamientos`, {
      params: queryParameters
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener alojamientos: ', error);
    throw error;
  }
}

export const getPaises = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/paises`);
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Error al obtener países:', error);
  }
}

export const getCiudadesPais = async (idPais) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ciudades?id=${idPais}`);
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Error al obtener ciudades:', error);
  }
}

export const getCaracteristicas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/caracteristicas`);
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Error al obtener características:', error);
  }
}

export const NUMERO_PAGINA_DEFAULT = 1;
export const TAMANIO_PAGINA_DEFAULT = 10;

const construirQueryParameters = (filtros = {}, { numeroPagina = NUMERO_PAGINA_DEFAULT, tamanioPagina = TAMANIO_PAGINA_DEFAULT } = {}) => {
  const queryParameters = {};

  const { idCiudad, idPais, latitud, longitud, precioMinimo, precioMaximo, huespedes, caracteristicas } = filtros;

  if (idCiudad) queryParameters.idCiudad = idCiudad;
  if (idPais) queryParameters.idPais = idPais;
  if (latitud) queryParameters.latitud = latitud;
  if (longitud) queryParameters.longitud = longitud;
  if (precioMinimo) queryParameters.precioMinimo = precioMinimo;
  if (precioMaximo) queryParameters.precioMaximo = precioMaximo;
  if (huespedes) queryParameters.huespedes = huespedes;
  if (caracteristicas && caracteristicas.length > 0) {
    queryParameters.caracteristicas = caracteristicas.join(',');
  }

  queryParameters.pagina = numeroPagina;
  queryParameters.tamanioPagina = tamanioPagina;

  return queryParameters;
};