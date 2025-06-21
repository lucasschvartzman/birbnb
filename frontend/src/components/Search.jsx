import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Slider, Checkbox, FormControlLabel } from '@mui/material';

const Search = () => {
  const [ciudad, setCiudad] = useState('');
  const [pais, setPais] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [huespedes, setHuespedes] = useState(0);
  const [precio, setPrecio] = useState([0, 100000]);


  const limpiarFiltros = () => {
    setCiudad('');
    setPais('');
    setFechaDesde('');
    setFechaHasta('');
    setHuespedes(0);
    setPrecio([0, 100000]);
  };
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', pb: 3 }}>
       <span style={{ color: '#f48fb1' }}>Alojamientos</span>{' '}Disponibles
      </Typography>


      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <TextField
        fullWidth
        label="Buscar por ciudad"
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
        variant="outlined"
        sx={{
          
          backgroundColor: '#fff',
          width: 190,
        }}
        />
        <TextField
        fullWidth
        label="Buscar por pais"
        value={pais}
        onChange={(e) => setPais(e.target.value)}
        variant="outlined"
        sx={{
          backgroundColor: '#fff',
          width: 190,
        }}
        />
        <TextField type="date" label="Desde" InputLabelProps={{ shrink: true }} value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)}/>
        <TextField type="date" label="Hasta" InputLabelProps={{ shrink: true }} value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)}/>
        <TextField label="Huéspedes" type="number" sx={{ width: 130 }} value={huespedes} onChange={(e) => setHuespedes(e.target.value)}/>
        <Box sx={{ width: 200 }}>
          <Typography gutterBottom>Precio por noche</Typography>
          <Slider
            value={precio}
          onChange={(e, newValue) => setPrecio(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={100000}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2}}>
        <Button
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: '#f48fb1',
          '&:hover': {
            backgroundColor: '#f8bbd0',
          },
        }}>Buscar
        </Button>
        <Button  onClick={limpiarFiltros}
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: '#a8a8a8  ',
          '&:hover': {
            backgroundColor: '#b0b0b0',
          },}}>Limpiar filtros
        </Button>
      </Box>
      

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
          }}>Seria la vista por defecto de todos los alojamientos
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
