import {
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
  StyledCard,
  IconText,
  ChipContainer,
  FeatureChip,
} from './AlojamientoPreview.styles';
import { formatCaracteristica, formatMoneda } from '../../utils/format';

const AlojamientoPreview = ({ alojamiento }) => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
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
    </StyledCard>
  );
};

export default AlojamientoPreview;