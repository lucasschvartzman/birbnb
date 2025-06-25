import React from 'react';
import { TextField } from '@mui/material';
import { CoordenadasContainer } from '../SearchFilters.styles';

const CoordenadasFiltro = ({ latitud, longitud, onChange }) => (
  <CoordenadasContainer>
    <TextField
      label="Latitud"
      type="number"
      value={latitud}
      onChange={(e) => onChange('latitud', e.target.value)}
      sx={{ width: 120 }}
      slotProps={{
        input: {
          inputProps: { step: 'any' }
        }
      }}
    />
    <TextField
      label="Longitud"
      type="number"
      value={longitud}
      onChange={(e) => onChange('longitud', e.target.value)}
      sx={{ width: 120 }}
      slotProps={{
        input: {
          inputProps: { step: 'any' }
        }
      }}
    />
  </CoordenadasContainer>
);

export default CoordenadasFiltro;
