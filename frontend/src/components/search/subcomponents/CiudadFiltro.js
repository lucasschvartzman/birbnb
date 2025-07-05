import React from 'react';
import { TextField, Autocomplete, FormControl } from '@mui/material';

const CiudadFiltro = ({ ciudad, ciudadesDisponibles, ciudadHabilitada, onChange }) => (
  <FormControl sx={{ width: 190 }}>
    <Autocomplete
      value={ciudad || null}
      onChange={(e, newValue) => onChange(newValue ?? '')}
      options={ciudadesDisponibles}
      renderInput={(params) => <TextField {...params} label="Ciudad" placeholder="Seleccionar ciudad" />}
      isOptionEqualToValue={(option, value) => option === value}
      clearOnEscape
      blurOnSelect
      disabled={!ciudadHabilitada}
    />
  </FormControl>
);

export default CiudadFiltro;
