import { useState, useEffect } from "react";
import { getCaracteristicas, getCiudadesPais, getPaises } from "../api/api.js";

export const useFiltros = () => {

  const filtrosIniciales = {
    ciudad: '',
    pais: '',
    huespedes: 0,
    precio: [0, 100000],
    latitud: '',
    longitud: '',
    caracteristicas: []
  };

  // States:
  const [filtros, setFiltros] = useState(filtrosIniciales);
  const [paisesDisponibles, setPaisesDisponibles] = useState([]);
  const [ciudadesDisponibles, setCiudadesDisponibles] = useState([]);
  const [caracteristicasDisponibles, setCaracteristicasDisponibles] = useState([]);

  // Si un país es seleccionado, se cargan las ciudades disponibles.
  useEffect(() => {
    const cargarCiudades = async () => {
      if (filtros.pais) {
        try {
          const paisSeleccionado = paisesDisponibles.find(p => p.nombre === filtros.pais);
          if (paisSeleccionado) {
            const ciudadesPais = await getCiudadesPais(paisSeleccionado.id);
            setCiudadesDisponibles(ciudadesPais);
          }
        } catch (error) {
          console.error('Error cargando las ciudades: ', error);
          setCiudadesDisponibles([]);
        }
      } else {
        setCiudadesDisponibles([]); // Si no hay país seleccionado, no hay ciudades disponibles
      }
    }
    cargarCiudades();
  }, [filtros.pais, paisesDisponibles]);

  /**
   * Actualiza los filtros de búsqueda.
   * Si cambia el país, se limpia la ciudad.
   * @param {Object} nuevosFiltros - Nuevos valores de filtros.
   */
  const handleFiltrosChange = (nuevosFiltros) => {
    const filtrosActualizados = {
      ...nuevosFiltros,
      // Si cambió el país, la ciudad debe estar vacía
      ciudad: nuevosFiltros.pais !== filtros.pais ? '' : nuevosFiltros.ciudad
    };
    setFiltros(filtrosActualizados);
  };

  /**
   * Carga los países disponibles para mostrar en los filtros de búsqueda.
   */
  const cargarPaises = async () => {
    try {
      const paises = await getPaises();
      setPaisesDisponibles(paises);
    } catch (error) {
      console.error('Error cargando los paises disponibles:', error);
    }
  }

  /**
   * Carga las características disponibles para mostrar en los filtros de búsqueda.
   */
  const cargarCaracteristicas = async () => {
    try {
      const caracteristicas = await getCaracteristicas();
      setCaracteristicasDisponibles(caracteristicas);
    } catch (error) {
      console.error('Error cargando las características disponibles:', error);
    }
  }

  /**
   * Resetea los filtros de búsqueda a sus valores iniciales.
   */
  const resetFiltros = () => {
    setFiltros(filtrosIniciales);
  }

  /**
   * Devuelve los filtros de búsqueda en el formato esperado por la API.
   */
  const obtenerFiltrosMapeadosParaApi = () => {

    const paisSeleccionado = paisesDisponibles.find(p => p.nombre === filtros.pais);
    const ciudadSeleccionada = ciudadesDisponibles.find(c => c.nombre === filtros.ciudad);

    return {
      idPais: paisSeleccionado?.id || undefined,
      idCiudad: ciudadSeleccionada?.id || undefined,
      latitud: filtros.latitud ? parseFloat(filtros.latitud) : undefined,
      longitud: filtros.longitud ? parseFloat(filtros.longitud) : undefined,
      precioMinimo: filtros.precio?.[0] || undefined,
      precioMaximo: filtros.precio?.[1] || undefined,
      caracteristicas: filtros.caracteristicas || undefined,
      pagina: filtros.pagina,
      tamanioPagina: filtros.tamanioPagina,
    }
  }

  return {
    // States:
    filtros,
    paisesDisponibles,
    ciudadesDisponibles,
    caracteristicasDisponibles,
    // Funciones:
    handleFiltrosChange,
    cargarPaises,
    cargarCaracteristicas,
    resetFiltros,
    obtenerFiltrosMapeadosParaApi
  }
}