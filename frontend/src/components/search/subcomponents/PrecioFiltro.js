import React from 'react';
import { FormControl, InputLabel, Slider, Box } from '@mui/material';
import { SliderContainer } from '../SearchFilters.styles';
import {PRECIO_MAXIMO, PRECIO_MINIMO} from "../../../hooks/useFiltros";

export const PrecioFiltro = ({ rango, onChange }) => (
  <SliderContainer>
    <InputLabel shrink>Precio por noche</InputLabel>
    <FormControl sx={{ width: '100%' }}>
      <Box sx={{ px: 1 }}>
        <Slider
          value={rango}
          onChange={(e, newValue) => onChange(newValue)}
          valueLabelDisplay="auto"
          min={PRECIO_MINIMO}
          max={PRECIO_MAXIMO}
          color="secondary"
          step={500}
        />
      </Box>
    </FormControl>
  </SliderContainer>
);

export default PrecioFiltro;
