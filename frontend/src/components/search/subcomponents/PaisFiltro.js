import React from 'react';
import { TextField, Autocomplete, FormControl } from '@mui/material';

const PaisFiltro = ({ pais, paisesDisponibles, onChange }) => (
  <FormControl sx={{ width: 190 }}>
    <Autocomplete
      value={pais || null}
      onChange={(e, newValue) => onChange(newValue ?? '')}
      options={paisesDisponibles}
      renderInput={(params) => <TextField {...params} label="País" placeholder="Seleccionar país" />}
      isOptionEqualToValue={(option, value) => option === value}
      clearOnEscape
      blurOnSelect
    />
  </FormControl>
);

export default PaisFiltro;
