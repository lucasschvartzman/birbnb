import { styled } from '@mui/material/styles';
import { Card,CardActions } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 12,
  boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
    
  },
}));

export const StyledCardActions = styled(CardActions)(({ theme }) => ({
  justifyContent: 'center',
  gap: theme.spacing(1),
  paddingTop: 0,
  paddingBottom: 8,
}));

export const IconText = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontSize: '0.95rem',
}));

export const ChipContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
}));

export const colorEstado = (theme) => ({
  Aceptada: theme.palette.success.main,
  Pendiente: theme.palette.warning.main,
  Cancelada: theme.palette.error.main,
});
