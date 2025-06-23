import React from 'react';
import {
  TextField,
  Slider,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  OutlinedInput, Box,
  Autocomplete
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import {
  FiltersContainer,
  FilterRow,
  FilterGroup,
  ButtonsContainer,
  SearchButton,
  ClearButton,
  SliderContainer,
  CoordenadasContainer
} from './SearchFilters.styles';

// TODO: Eliminar estos mocks, conectemos a la base:

const ciudadesPorPais = {
  'Argentina': ['Buenos Aires', 'Mar del Plata'],
  'Uruguay': ['Montevideo', 'Salto']
};

const paisesDisponibles = [
  'Argentina',
  'Uruguay'
]

const caracteristicasDisponibles = [
  'Wifi',
  'Piscina',
  'Estacionamiento',
  'Mascotas permitidas'
];

export const SearchFilters = ({ filtros, onFiltrosChange, onBuscar, onLimpiar }) => {
  const handleChange = (campo, valor) => {
    const nuevosFiltros = { ...filtros, [campo]: valor };

    // Si se cambia la ciudad, resetear el país
    if (campo === "pais") {
      nuevosFiltros.ciudad = '';
    }

    onFiltrosChange(nuevosFiltros);
  };

  const ciudadesDisponibles = filtros.pais ? ciudadesPorPais[filtros.pais] || [] : [];

  return (
    <FiltersContainer>
      <FilterRow>
        <FilterGroup>
          <FormControl sx={{ width: 190 }}>
            <Autocomplete 
              onChange={(event, newValue) =>
                handleChange("pais", newValue || '')
              }
              //disablePortal
              options={paisesDisponibles}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Pais"
                  placeholder="Seleccionar pais"
                />
              )}
              isOptionEqualToValue={(option, value) => option === value}
              clearOnEscape
              blurOnSelect
              sx={{
                "&.Mui-disabled": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            />
          </FormControl>
        </FilterGroup>

        <FilterGroup>
          <FormControl sx={{ width: 190 }} disabled={!filtros.pais}>
            <Autocomplete
              disabled={!filtros.pais}
              value={filtros.ciudad || null}
              onChange={(event, newValue) =>
                handleChange("ciudad", newValue || '')
              }
              //disablePortal
              options={ciudadesDisponibles}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ciudad"
                  placeholder="Seleccionar ciudad"
                />
              )}
              isOptionEqualToValue={(option, value) => option === value}
              clearOnEscape
              blurOnSelect
            />
          </FormControl>
        </FilterGroup>

        <FilterGroup>
          <TextField
            label="Huéspedes"
            type="number"
            value={filtros.huespedes}
            onChange={(e) => handleChange('huespedes', Math.max(0, parseInt(e.target.value) || 0))}
            sx={{ maxWidth: 120 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
                inputProps: { min: 0 }
              },
            }}
          />
        </FilterGroup>

        <CoordenadasContainer>
          <TextField
            label="Latitud"
            type="number"
            value={filtros.latitud}
            onChange={(e) => handleChange('latitud', e.target.value)}
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
            value={filtros.longitud}
            onChange={(e) => handleChange('longitud', e.target.value)}
            sx={{ width: 120 }}
            slotProps={{
              input: {
                inputProps: { step: 'any' }
              }
            }}
          />
        </CoordenadasContainer>

        <FilterGroup>
          <FormControl sx={{ width: 470 }}>
            <InputLabel>Características</InputLabel>
            <Select
              multiple
              value={filtros.caracteristicas}
              onChange={(e) => handleChange('caracteristicas', e.target.value)}
              input={<OutlinedInput label="Características" />}
              renderValue={(selected) => (
                <div style={{
                  display: 'flex',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  gap: 4
                }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      size="small"
                      sx={{
                        backgroundColor: 'secondary.light',
                        color: 'secondary.contrastText',
                        flexShrink: 0
                      }}
                    />
                  ))}
                </div>
              )}
            >
              {caracteristicasDisponibles.map((caracteristica) => (
                <MenuItem key={caracteristica} value={caracteristica}>
                  {caracteristica}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FilterGroup>

      <SliderContainer>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel shrink>Precio por noche</InputLabel>
          <Box sx={{ mt: 3, px: 1 }}>
            <Slider
              value={filtros.precio}
              onChange={(e, newValue) => handleChange('precio', newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={100000}
              color="secondary"
            />
          </Box>
        </FormControl>
      </SliderContainer>

    </FilterRow>
      <FilterRow>
      <ButtonsContainer>
        <SearchButton
          onClick={onBuscar}
          variant="contained"
        >
          Buscar
        </SearchButton>
        <ClearButton
          onClick={onLimpiar}
          variant="contained"
        >
          Limpiar filtros
        </ClearButton>
      </ButtonsContainer>
    </FilterRow>
    </FiltersContainer>
  );
};

export default SearchFilters;