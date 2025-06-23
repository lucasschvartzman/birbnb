import React from 'react';
import {
  FiltersContainer,
  FilterRow,
  ButtonsContainer,
  SearchButton,
  ClearButton
} from './SearchFilters.styles';

import PaisFiltro from "./subcomponents/PaisFiltro";
import CiudadFiltro from "./subcomponents/CiudadFiltro";
import HuespedesFiltro from "./subcomponents/HuespedesFiltro";

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
          paisesDisponibles={paisesDisponibles}
          onChange={nuevoPais => onFiltrosChange({ ...filtros, pais: nuevoPais })}
        />

        <CiudadFiltro
          ciudad={filtros.ciudad}
          ciudadesDisponibles={ciudadesDisponibles}
          ciudadHabilitada={Boolean(filtros.pais)}
          onChange={nuevaCiudad => onFiltrosChange({ ...filtros, ciudad: nuevaCiudad })}
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
  )
};

export default SearchFilters;
