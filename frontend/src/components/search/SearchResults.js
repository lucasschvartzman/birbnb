import React from 'react';
import AlojamientoCard from '../cards/AlojamientoCard';
import { ResultsContainer } from './SearchResults.styles';

const SearchResults = ({ resultados }) => {
  return (
    <ResultsContainer>
      {resultados.map((alojamiento) => (
        <AlojamientoCard key={alojamiento.id} alojamiento={alojamiento} />
      ))}
    </ResultsContainer>
  );
};

export default SearchResults;