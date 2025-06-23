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
    console.log('Error al iniciar sesión: ', error);
    throw error;
  }
}

export const getAlojamientos = async (filtros = {}, opcionesPaginacion = {}) => {
  try {
    const queryParameters = construirQueryParameters(filtros, opcionesPaginacion);
    const response = await axios.get(`${API_BASE_URL}/alojamientos`, {
      params: queryParameters
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.log('Error al obtener alojamientos: ', error);
    throw error;
  }
}

export const getPaises = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/paises`);
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Error al obtener países:', error);
    // TODO: Eliminar el fallback de mocks, lo dejo para probar sin implementar el endpoint en el backend.
    const paisesMock = [{ id: 1, nombre: 'Argentina' }, { id: 2, nombre: 'Uruguay' }];
    return paisesMock;
  }
}

export const getCiudadesPais = async (paisId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ciudades?paisId=${paisId}`);
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Error al obtener ciudades:', error);
    // TODO: Eliminar el fallback de mocks, lo dejo para probar sin implementar el endpoint en el backend.
    const ciudadesMock = {
      1: [
        { id: 1, nombre: 'Buenos Aires' },
        { id: 2, nombre: 'Mar del Plata' },
        { id: 3, nombre: 'Córdoba' },
        { id: 4, nombre: 'Rosario' }
      ],
      2: [
        { id: 5, nombre: 'Montevideo' },
        { id: 6, nombre: 'Salto' },
        { id: 7, nombre: 'Punta del Este' }
      ]
    };
    return ciudadesMock[paisId] || [];
  }
}

export const getCaracteristicas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/caracteristicas`);
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Error al obtener características:', error);
    // TODO: Eliminar el fallback de mocks, lo dejo para probar sin implementar el endpoint en el backend.
    const caracteristicasMock = ['WIFI', 'PISCINA', 'ESTACIONAMIENTO', 'MASCOTAS_PERMITIDAS'];
    return caracteristicasMock;
  }
}

const NUMERO_PAGINA_DEFAULT = 1;
const TAMAÑO_PAGINA_DEFAULT = 15;

const construirQueryParameters = (filtros = {}, { numeroPagina = NUMERO_PAGINA_DEFAULT, tamañoPagina = TAMAÑO_PAGINA_DEFAULT } = {}) => {
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
  queryParameters.tamanioPagina = tamañoPagina;

  return queryParameters;
};