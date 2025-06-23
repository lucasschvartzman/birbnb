import { useState } from 'react';
import {getAlojamientos, NUMERO_PAGINA_DEFAULT, TAMANIO_PAGINA_DEFAULT} from '../api/api';

export const useAlojamientos = () => {
  // States:
  const [resultados, setResultados] = useState([]);

  const [paginacion, setPaginacion] = useState({
    totalPaginas: 1,
    totalElementos: 0,
    paginaActual: NUMERO_PAGINA_DEFAULT,
    tamanioPagina: TAMANIO_PAGINA_DEFAULT,
    hayPaginaAnterior: false,
    hayPaginaSiguiente: false
  });

  /**
   * Busca alojamientos usando la API
   * @param {Object} filtros - Filtros ya transformados para la API
   * @param {Object} paginacion - Opciones de paginación {numeroPagina, tamañoPagina}
   */
  const buscarAlojamientos = async (filtros = {}, paginacion = {}) => {

    try {
      const response = await getAlojamientos(filtros, paginacion);
      setResultados(response.alojamientos);
      setPaginacion(response.paginacion)
    } catch (error) {
      console.error('Error en búsqueda:', error);
      setResultados([]);
    }
  };

  return {
    // Estados
    resultados,
    paginacion,
    // Funciones
    buscarAlojamientos
  };
};