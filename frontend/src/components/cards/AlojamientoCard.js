import { useNavigate } from 'react-router-dom';
import {
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useAuth } from '../../context/AuthContext';
import { useReserva } from '../../context/ReservaContext'; // Importar el contexto
import {
  StyledCard,
  IconText,
  ChipContainer,
  FeatureChip,
} from './AlojamientoCard.styles';
import { formatCaracteristica, formatMoneda } from '../../utils/format';

const AlojamientoCard = ({ alojamiento }) => {
  const { estaAutenticado } = useAuth();
  const { seleccionarAlojamiento } = useReserva();
  const navigate = useNavigate();

  const handleReservar = () => {
    seleccionarAlojamiento(alojamiento);
    navigate('/crearReserva');
  };
  
  return (
    <StyledCard data-aos="zoom-in">
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
          <Button
            sx={{mb:1.3}}
            variant="contained" 
            color="secondary" 
            onClick={handleReservar}
            
          >
            Reservar
          </Button>
        </CardActions>
      )}
    </StyledCard>
  );
};

export default AlojamientoCard;