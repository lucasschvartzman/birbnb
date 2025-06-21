import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
  Box, TextField, Button, Typography, Slider,
  Card, CardContent, CardMedia, Grid,
} from '@mui/material';

const alojamientosMock = [
  {
    id: '1',
    nombre: 'Departamento en Palermo',
    descripcion: 'Cómodo departamento con wifi y piscina',
    precioPorNoche: 3500,
    moneda: 'ARS',
    direccion: {
      calle: 'Honduras',
      altura: 1234,
      ciudad: 'Buenos Aires',
    },
    cantHuespedesMax: 3,
    caracteristicas: ['Wifi', 'Piscina'],
    fotos: [
      { path: 'https://picsum.photos/400/200?random=1', descripcion: 'Foto 1' }
    ]
  },
  {
    id: '2',
    nombre: 'Casa en Mar del Plata',
    descripcion: 'Casa familiar con estacionamiento',
    precioPorNoche: 5000,
    moneda: 'ARS',
    direccion: {
      calle: 'San Martín',
      altura: 987,
      ciudad: 'Mar del Plata',
    },
    cantHuespedesMax: 6,
    caracteristicas: ['Estacionamiento'],
    fotos: [
      { path: 'https://picsum.photos/400/200?random=2', descripcion: 'Foto 2' }
    ]
  },
];

const Search = () => {
  const { estaAutenticado } = useAuth();
  const [ciudad, setCiudad] = useState('');
  const [pais, setPais] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [huespedes, setHuespedes] = useState(0);
  const [precio, setPrecio] = useState([0, 100000]);
  const [resultados, setResultados] = useState(alojamientosMock);


  const limpiarFiltros = () => {
    setCiudad('');
    setPais('');
    setFechaDesde('');
    setFechaHasta('');
    setHuespedes(0);
    setPrecio([0, 100000]);
    setResultados(alojamientosMock);
  };

  const handleBuscar = () => {
    const filtrados = alojamientosMock.filter((a) =>
      a.direccion.ciudad.toLowerCase().includes(ciudad.toLowerCase()) &&
      a.cantHuespedesMax >= huespedes &&
      a.precioPorNoche >= precio[0] &&
      a.precioPorNoche <= precio[1]
    );
    setResultados(filtrados);
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
        <TextField type="date" label="Desde" InputLabelProps={{ shrink: true }} value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} />
        <TextField type="date" label="Hasta" InputLabelProps={{ shrink: true }} value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} />
        <TextField label="Huéspedes" type="number" sx={{ width: 130 }} value={huespedes} onChange={(e) => setHuespedes(e.target.value)} />
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
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button onClick={handleBuscar}
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: '#f48fb1',
            '&:hover': {
              backgroundColor: '#f8bbd0',
            },
          }}>Buscar
        </Button>
        <Button onClick={limpiarFiltros}
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: '#a8a8a8  ',
            '&:hover': {
              backgroundColor: '#b0b0b0',
            },
          }}>Limpiar filtros
        </Button>
      </Box>


      <Grid container spacing={3} sx={{ mt: 4 }} justifyContent="center">
        {resultados.map((a) => (
          <Grid item xs={12} sm={6} md={4} key={a.id} display="flex" justifyContent="center">
            <Card sx={{ width: 320, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CardMedia
                component="img"
                height="140"
                image={a.fotos[0]?.path}
                alt={a.fotos[0]?.descripcion}
              />
              <CardContent sx={{ width: '100%' }}>
                <Box sx={{ textAlign: 'left', ml: 1 }}>
                  <Typography variant="h6">{a.nombre}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {a.descripcion}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <LocationOnIcon fontSize="small" />
                    {a.direccion.calle} {a.direccion.altura}, {a.direccion.ciudad}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <GroupsIcon fontSize="small" />
                    Hasta {a.cantHuespedesMax} huéspedes
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <AttachMoneyIcon fontSize="small" />
                    {a.precioPorNoche} {a.moneda} por noche
                  </Typography>

                  {a.caracteristicas?.length > 0 && (
                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {a.caracteristicas.map((carac, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          sx={{
                            backgroundColor: '#f1f1f1',
                            borderRadius: '12px',
                            px: 1.2,
                            py: 0.3,
                            fontSize: '0.75rem',
                            color: '#555',
                          }}
                        >
                          #{carac}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>

                {estaAutenticado && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#f48fb1',
                        '&:hover': { backgroundColor: '#f8bbd0' },
                      }}
                    >
                      Reservar
                    </Button>
                  </Box>
                )}
              </CardContent>

            </Card>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default Search;
