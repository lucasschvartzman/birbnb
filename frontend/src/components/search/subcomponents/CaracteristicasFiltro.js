import React from 'react';
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select} from '@mui/material';
import {CaracteristicasContainer, StyledChip} from "./CaracteristicasFiltro.styles";
import {formatCaracteristica} from "../../../utils/format";

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
            <StyledChip key={value} label={formatCaracteristica(value)} size="small"/>
          ))}
        </CaracteristicasContainer>
      )}
     variant={"filled"}>
      {caracteristicasDisponibles.map((c) => (
        <MenuItem key={c} value={c}>
          {formatCaracteristica(c)}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default CaracteristicasFiltro;
