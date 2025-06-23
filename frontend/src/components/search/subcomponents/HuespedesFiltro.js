import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const HuespedesFiltro = ({ cantidad, onChange }) => (
  <TextField
    label="Huéspedes"
    type="number"
    value={cantidad}
    onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
    sx={{ maxWidth: 120 }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <PersonIcon />
        </InputAdornment>
      ),
      inputProps: { min: 0 }
    }}
  />
);

export default HuespedesFiltro;
