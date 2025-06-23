import React from 'react';
import { CardMedia, CardContent, Typography } from '@mui/material';
import {
  LocationOn as LocationOnIcon,
  Groups as GroupsIcon,
  AttachMoney as AttachMoneyIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import {
  StyledCard,
  CardContentContainer,
  InfoContainer,
  InfoRow,
  CharacteristicsContainer,
  CharacteristicChip,
  ReserveButtonContainer,
  ReserveButton
} from './AlojamientoCard.styles';

const AlojamientoCard = ({ alojamiento }) => {
  const { estaAutenticado } = useAuth();

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="140"
        image={alojamiento.fotos[0]?.path}
        alt={alojamiento.fotos[0]?.descripcion}
      />
      <CardContent sx={{ width: '100%' }}>
        <CardContentContainer>
          <InfoContainer>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              {alojamiento.nombre}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {alojamiento.descripcion}
            </Typography>

            <InfoRow>
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2">
                {alojamiento.direccion.calle} {alojamiento.direccion.altura}, {alojamiento.direccion.ciudad.nombre}
              </Typography>
            </InfoRow>

            <InfoRow>
              <GroupsIcon fontSize="small" />
              <Typography variant="body2">
                Hasta {alojamiento.cantHuespedesMax} huéspedes
              </Typography>
            </InfoRow>

            <InfoRow>
              <AttachMoneyIcon fontSize="small" />
              <Typography variant="body2">
                {alojamiento.precioPorNoche} {alojamiento.moneda} por noche
              </Typography>
            </InfoRow>

            {alojamiento.caracteristicas?.length > 0 && (
              <CharacteristicsContainer>
                {alojamiento.caracteristicas.map((caracteristica, index) => (
                  <CharacteristicChip key={index}>
                    #{caracteristica}
                  </CharacteristicChip>
                ))}
              </CharacteristicsContainer>
            )}
          </InfoContainer>

          {estaAutenticado && (
            <ReserveButtonContainer>
              <ReserveButton variant="contained">
                Reservar
              </ReserveButton>
            </ReserveButtonContainer>
          )}
        </CardContentContainer>
      </CardContent>
    </StyledCard>
  );
};

export default AlojamientoCard;