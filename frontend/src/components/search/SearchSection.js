import React, { useState } from 'react';
import { Typography, Pagination } from '@mui/material';
import SearchFilters from './SearchFilters';
import SearchResults from './SearchResults';
import {
  SearchContainer,
  SearchTitle,
  PaginationContainer
} from './SearchSection.styles';

const alojamientosMock = [
  {
    id: '1',
    nombre: 'Departamento en Palermo',
    descripcion: 'Cómodo departamento con wifi y piscina',
    precioPorNoche: 3500,
    moneda: 'ARS',
    direccion: {
      calle: 'Honduras',
      altura: 1234,
      ciudad: 'Buenos Aires',
    },
    cantHuespedesMax: 3,
    caracteristicas: ['Wifi', 'Piscina'],
    fotos: [
      { path: 'https://picsum.photos/400/200?random=1', descripcion: 'Foto 1' }
    ]
  },
  {
    id: '2',
    nombre: 'Casa en Mar del Plata',
    descripcion: 'Casa familiar con estacionamiento',
    precioPorNoche: 5000,
    moneda: 'ARS',
    direccion: {
      calle: 'San Martín',
      altura: 987,
      ciudad: 'Mar del Plata',
    },
    cantHuespedesMax: 6,
    caracteristicas: ['Estacionamiento'],
    fotos: [
      { path: 'https://picsum.photos/400/200?random=2', descripcion: 'Foto 2' }
    ]
  },
];

const SearchSection = () => {
  const [filtros, setFiltros] = useState({
    ciudad: '',
    pais: '',
    huespedes: 0,
    precio: [0, 100000],
    latitud: '',
    longitud: '',
    caracteristicas: []
  });

  const [resultados, setResultados] = useState(alojamientosMock);
  const [paginaActual, setPaginaActual] = useState(1);
  const resultadosPorPagina = 1;

  const handleFiltrosChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

  const handleBuscar = () => {
    // TODO: Ejecutar la llamada a la API
  };

  const limpiarFiltros = () => {
    const filtrosLimpios = {
      ciudad: '',
      pais: '',
      huespedes: 0,
      precio: [0, 100000],
      latitud: '',
      longitud: '',
      caracteristicas: []
    };
    setFiltros(filtrosLimpios);
    setResultados(alojamientosMock);
    setPaginaActual(1);
  };

  const handleCambioPagina = (event, value) => {
    setPaginaActual(value);
  };

  const totalPaginas = Math.ceil(resultados.length / resultadosPorPagina);
  const indiceInicio = (paginaActual - 1) * resultadosPorPagina;
  const resultadosPaginados = resultados.slice(indiceInicio, indiceInicio + resultadosPorPagina);

  return (
    <SearchContainer>
      <SearchTitle variant="h4">
        <span>Alojamientos</span> Disponibles
      </SearchTitle>

      <SearchFilters
        filtros={filtros}
        onFiltrosChange={handleFiltrosChange}
        onBuscar={handleBuscar}
        onLimpiar={limpiarFiltros}
      />

      <SearchResults resultados={resultadosPaginados} />

      {totalPaginas > 1 && (
        <PaginationContainer>
          <Pagination
            count={totalPaginas}
            page={paginaActual}
            onChange={handleCambioPagina}
            color="secondary"
            size="large"
          />
        </PaginationContainer>
      )}
    </SearchContainer>
  );
};

export default SearchSection;