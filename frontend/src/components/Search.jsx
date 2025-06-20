import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Slider, Checkbox, FormControlLabel } from '@mui/material';

const Search = () => {
  const [precio, setPrecio] = useState([0, 100000]);

  const handlePrecioChange = (event, newValue) => {
    setPrecio(newValue);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', pb: 3 }}>
       <span style={{ color: '#f48fb1' }}>Alojamientos</span>{' '}Disponibles
      </Typography>


      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <TextField
        fullWidth
        label="Buscar por lugar"
        variant="outlined"
        sx={{
          backgroundColor: '#fff',
          maxWidth: 290,
        }}
        />
        <TextField type="date" label="Desde" InputLabelProps={{ shrink: true }} />
        <TextField type="date" label="Hasta" InputLabelProps={{ shrink: true }} />
        <TextField label="Huéspedes" type="number" />
        <Box sx={{ width: 200 }}>
          <Typography gutterBottom>Precio por noche</Typography>
          <Slider
            value={precio}
            onChange={handlePrecioChange}
            valueLabelDisplay="auto"
            min={0}
            max={100000}
          />
        </Box>
      </Box>

      <Button
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: '#f48fb1',
          '&:hover': {
            backgroundColor: '#f8bbd0',
          },
        }}
      >
        Buscar
      </Button>

      {/*iría el carousel con alojamientos m*/}
      <Box sx={{ mt: 4 }}>
        <Box
          sx={{
            height: '200px',
            backgroundColor: '#f8bbd0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#333',
            borderRadius: '8px',
          }}
        >
        Seria la vista por defecto de todos los alojamientos
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
