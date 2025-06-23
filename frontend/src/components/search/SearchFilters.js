import React from 'react';
import {
  FiltersContainer,
  FilterRow,
  ButtonsContainer,
  SearchButton,
  ClearButton
} from './SearchFilters.styles';

const SearchFilters = ({
                         filtros,
                         onFiltrosChange,
                         onBuscar,
                         onLimpiar,
                         paisesDisponibles,
                         ciudadesDisponibles,
                         caracteristicasDisponibles
                       }) => {

  return (
    <FiltersContainer>
      <FilterRow>
        <PaisFiltro
          pais={filtros.pais}
          onChange={nuevoPais => onFiltrosChange({ ...filtros, pais: nuevoPais })}
          paises={paisesDisponibles}
        />

        <CiudadFiltro
          ciudad={filtros.ciudad}
          onChange={nuevaCiudad => onFiltrosChange({ ...filtros, ciudad: nuevaCiudad })}
          ciudadHabilitada={Boolean(filtros.pais)}
          ciudades={ciudadesDisponibles}
        />

        <HuespedesFiltro
          cantidad={filtros.huespedes}
          onChange={nuevaCantidad => onFiltrosChange({ ...filtros, huespedes: nuevaCantidad })}
        />

        <CoordenadasFiltro
          latitud={filtros.latitud}
          longitud={filtros.longitud}
          onChange={(campo, valor) => onFiltrosChange({ ...filtros, [campo]: valor })}
        />

        <CaracteristicasFiltro
          seleccionadas={filtros.caracteristicas}
          onChange={nuevas => onFiltrosChange({ ...filtros, caracteristicas: nuevas })}
          opciones={caracteristicasDisponibles}
        />

        <PrecioFiltro
          rango={filtros.precio}
          onChange={nuevoRango => onFiltrosChange({ ...filtros, precio: nuevoRango })}
        />
      </FilterRow>

      <FilterRow>
        <ButtonsContainer>
          <SearchButton onClick={onBuscar} variant="contained">Buscar</SearchButton>
          <ClearButton onClick={onLimpiar} variant="contained">Limpiar filtros</ClearButton>
        </ButtonsContainer>
      </FilterRow>
    </FiltersContainer>
  );
};

export default SearchFilters;
