import React from 'react';
import {
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
} from '@mui/material';
import {
  LocationOn as LocationOnIcon,
  Groups as GroupsIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import {
  StyledCard,
  IconText,
  ChipContainer,
  FeatureChip
} from './AlojamientoCard.styles';
import {formatCaracteristica, formatMoneda} from "../../utils/format";

const AlojamientoCard = ({ alojamiento }) => {
  const { estaAutenticado } = useAuth();

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="140"
        image={alojamiento.fotos[0]}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {alojamiento.nombre}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {alojamiento.descripcion}
        </Typography>

        <IconText>
          <LocationOnIcon fontSize="small" />
          {`${alojamiento.direccion.calle} ${alojamiento.direccion.altura}, ${alojamiento.direccion.ciudad.nombre}`}
        </IconText>

        <IconText>
          <GroupsIcon fontSize="small" />
          Hasta {alojamiento.cantHuespedesMax} huésped{alojamiento.cantHuespedesMax > 1 ? 'es' : ''}
        </IconText>

        <IconText>
          <AttachMoneyIcon fontSize="small" />
          {alojamiento.precioPorNoche.toLocaleString()} {formatMoneda(alojamiento.moneda)} por noche
        </IconText>

        {alojamiento.caracteristicas?.length > 0 && (
          <ChipContainer>
            {alojamiento.caracteristicas.map((c, i) => (
              <FeatureChip key={i} label={`${formatCaracteristica(c)}`} />
            ))}
          </ChipContainer>
        )}
      </CardContent>

      {estaAutenticado && (
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" color="secondary">
            Reservar
          </Button>
        </CardActions>
      )}
    </StyledCard>
  );
};

export default AlojamientoCard;
