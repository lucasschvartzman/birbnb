import React from 'react';
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select} from '@mui/material';
import {CaracteristicasContainer, StyledChip} from "./CaracteristicasFiltro.styles";

export const CaracteristicasFiltro = ({ seleccionadas, caracteristicasDisponibles, onChange }) => (
  <FormControl sx={{ width: 470 }}>
    <InputLabel>Características</InputLabel>
    <Select
      multiple
      value={seleccionadas}
      onChange={(e) => onChange(e.target.value)}
      input={<OutlinedInput label="Características" />}
      renderValue={(selected) => (
        <CaracteristicasContainer>
          {selected.map((value) => (
            <StyledChip key={value} label={value} size="small"/>
          ))}
        </CaracteristicasContainer>
      )}
    >
      {caracteristicasDisponibles.map((caracteristica) => (
        <MenuItem key={caracteristica} value={caracteristica}>
          {caracteristica}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default CaracteristicasFiltro;
