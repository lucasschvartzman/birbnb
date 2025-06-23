import React, { useEffect } from 'react';
import { Typography, Pagination, CircularProgress, Alert } from '@mui/material';
import SearchFilters from './SearchFilters';
import SearchResults from './SearchResults';
import { useFiltros } from "../../hooks/useFiltros";
import { useAlojamientos} from "../../hooks/useAlojamientos";
import {
  SearchContainer,
  SearchTitle,
  PaginacionContainer
} from './SearchSection.styles';

const SearchSection = () => {

  const {
    filtros,
    paisesDisponibles,
    ciudadesDisponibles,
    caracteristicasDisponibles,
    handleFiltrosChange,
    cargarPaises,
    cargarCaracteristicas,
    resetFiltros,
    obtenerFiltrosMapeadosParaApi
  } = useFiltros();
  
  const {
    resultados,
    paginacion,
    buscarAlojamientos
  } = useAlojamientos();

  // Cargar los datos mínimos e indispensables para mostrar en home.
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      await cargarPaises();
      await cargarCaracteristicas();
      await buscarAlojamientos(); // Sin filtros, paginación por default.
    };
    cargarDatosIniciales();
  }, []);

  const handleBuscar = async (paginacion) => {
    await buscarAlojamientos(obtenerFiltrosMapeadosParaApi(), paginacion);
  };

  const handleLimpiarFiltros = async () => {
    resetFiltros();
    await handleBuscar();
  };

  const handleCambioPagina = async (event, nuevaPagina) => {
    await handleBuscar({ numeroPagina: nuevaPagina });
  };

  return (
    <SearchContainer>
      <SearchTitle variant="h4" component="h1"> Buscar Alojamientos </SearchTitle>

      <SearchFilters
        filtros={filtros}
        onFiltrosChange={handleFiltrosChange}
        onBuscar={handleBuscar}
        onLimpiar={handleLimpiarFiltros}
        paisesDisponibles={paisesDisponibles.map(p => p.nombre)}
        ciudadesDisponibles={ciudadesDisponibles.map(c => c.nombre)}
        caracteristicasDisponibles={caracteristicasDisponibles}
      />

      <SearchResults resultados={resultados} />

      { paginacion.totalPaginas > 1 && (
        <PaginacionContainer>
          <Pagination count={paginacion.totalPaginas} page={paginacion.paginaActual} onChange={handleCambioPagina} color="primary" size="large"/>
        </PaginacionContainer>
      )}

    </SearchContainer>
  );
};

export default SearchSection;