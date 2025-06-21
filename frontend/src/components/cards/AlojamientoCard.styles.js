import { styled } from '@mui/material/styles';
import { Card, Box, Typography, Button } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  width: 320,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

export const CardContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  marginLeft: theme.spacing(1),
}));

export const InfoRow = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  '& svg': {
    color: theme.palette.text.secondary,
  }
}));

export const CharacteristicsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

export const CharacteristicChip = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: '12px',
  paddingLeft: theme.spacing(1.2),
  paddingRight: theme.spacing(1.2),
  paddingTop: theme.spacing(0.3),
  paddingBottom: theme.spacing(0.3),
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
}));

export const ReserveButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
}));

export const ReserveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
  },
}));