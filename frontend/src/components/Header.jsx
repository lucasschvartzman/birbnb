import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import backgroundImage from '../assets/image.jpg';

const Header = ({ onVerAlojamientosClick }) => {
  return (
    <Box
    sx={{
    height: '60vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 2,
    color: '#fff',
    overflow: 'hidden',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 0,
    },
  }}>
  <Box sx={{ zIndex: 1 }}>
    <Typography variant="h2" gutterBottom>
      Bienvenido a Birbnb
    </Typography>
    <Typography variant="h6" gutterBottom>
      Descubrí alojamientos únicos en todo el mundo
    </Typography>
    <Button
      variant="contained"
      size="large"
      sx={{
        backgroundColor: '#f48fb1',
        '&:hover': {
          backgroundColor: '#f8bbd0',
        },
        color: '#fff',
        mt: 2,
      }}  onClick={onVerAlojamientosClick}>Ver alojamientos!
    </Button>
  </Box>
    </Box>

  );
};

export default Header;
