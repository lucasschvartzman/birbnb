import React from 'react';
import { Typography } from '@mui/material';
import {
  HeaderContainer,
  HeaderOverlay,
  HeaderContent,
  HeaderButton
} from './Header.styles';

const Header = ({ onVerAlojamientosClick }) => {
  return (
    <HeaderContainer>
      <HeaderOverlay />
      <HeaderContent>
        <Typography variant="h2" gutterBottom sx={{ color: 'inherit' }}>
          Bienvenido a Birbnb
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: 'inherit' }}>
          Descubrí alojamientos únicos en todo el mundo
        </Typography>
        <HeaderButton variant="contained" size="large" onClick={onVerAlojamientosClick}>
          Ver alojamientos
        </HeaderButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;