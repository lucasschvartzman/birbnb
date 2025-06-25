import React from 'react';
import AlojamientoCard from '../cards/AlojamientoCard';
import { ResultsContainer } from './SearchResults.styles';
import {Box, Typography} from "@mui/material";

export const SearchResults = ({ resultados }) => {

  if (!resultados || resultados.length === 0) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography variant="body1" color="text.secondary">
          No se encontraron alojamientos que coincidan con los filtros seleccionados.
        </Typography>
      </Box>
    );
  }

  return (
    <ResultsContainer>
      {resultados.map((alojamiento, index) => (
        <AlojamientoCard key={index} alojamiento={alojamiento} />
      ))}
    </ResultsContainer>
  );
};

export default SearchResults;