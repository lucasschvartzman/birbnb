import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Person2Icon from '@mui/icons-material/Person2';

import {
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Chip,
  Button,
} from '@mui/material';

const reservasMock = [
  {
    id: 1,
    alojamiento: "Departamento en Palermo",
    fechaInicio: "2025-06-21",
    fechaFin: "2025-06-25",
    cantidadHuespedes: 2,
    precioPorNoche: 3000,
    estado: "Aceptada",
    direccion: "Calle Falsa 123, Palermo",
    anfitrion: "Juan Perez",
  },
  {
    id: 2,
    alojamiento: "Casa en Mar del Plata",
    fechaInicio: "2025-07-01",
    fechaFin: "2025-07-07",
    cantidadHuespedes: 4,
    precioPorNoche: 5000,
    estado: "Pendiente",
    direccion: "Av. Siempre Viva 742, Mar del Plata",
    anfitrion: "Maria Lopez",
  },
  {
    id: 3,
    alojamiento: "Monoambiente en Recoleta",
    fechaInicio: "2025-06-28",
    fechaFin: "2025-07-02",
    cantidadHuespedes: 1,
    precioPorNoche: 2000,
    estado: "Cancelada",
    direccion: "Av. Libertador 500, Recoleta",
    anfitrion: "Carlos Gomez",
  },
];

const calcularTotal = (precioPorNoche, fechaInicio, fechaFin) => {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  const diffTime = Math.abs(fin - inicio);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays * precioPorNoche;
};

const colorEstado = {
  Aceptada: '#81c784',  
  Pendiente: '#ffb74d',
  Cancelada: '#e57373', 
};

const Reservas = () => {
  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: 'auto' }}>
      <Box sx={{ position: 'relative', paddingBottom: 2, mb: 4, textAlign: 'left' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Mis <span style={{ color: '#f48fb1' }}>Reservas</span>
        </Typography>
        <Box
          sx={{
            height: 6,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            background: 'linear-gradient(90deg,rgb(255, 255, 255), #f48fb1)',
            borderRadius: 2,
          }}
        />
      </Box>

      <Grid container spacing={3} justifyContent="center">
        
  {reservasMock.map((reserva) => (
    <Grid item xs={12} sm={6} md={4} key={reserva.id}>
      <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>{reserva.alojamiento}</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
            <LocationOnIcon fontSize="small" /> {reserva.direccion}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1}}>
            <Person2Icon fontSize="small"/> Anfitrión: {reserva.anfitrion}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5, mt: 1}}>
            <EventIcon fontSize="small" /> {reserva.fechaInicio} a {reserva.fechaFin}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1}}>
            <GroupsIcon fontSize="small" /> {reserva.cantidadHuespedes} huésped{reserva.cantidadHuespedes > 1 ? 'es' : ''}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1}}>
            <AttachMoneyIcon fontSize="small" /> Precio por noche: ${reserva.precioPorNoche}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5, mt: 1}}>
            <MonetizationOnIcon fontSize="small" /> Total: ${calcularTotal(reserva.precioPorNoche, reserva.fechaInicio, reserva.fechaFin)}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Chip 
            label={`Estado: ${reserva.estado}`}
            sx={{ bgcolor: colorEstado[reserva.estado], color: 'white', fontWeight: 'bold' }}
          /></Box>
        </CardContent>
         <CardActions sx={{ justifyContent: 'center' }}>
              {reserva.estado !== "Cancelada" && (
                <Button
                  variant="outlined"
                  color="error"
                 // onClick={() => handleCancelar(reserva.id)}
                >
                  Cancelar Reserva
                </Button>
              )}
            </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>
    </Box>
  );
};

export default Reservas;
