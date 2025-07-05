import { styled } from '@mui/material/styles';
import { Card, Chip } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  justifyContent: 'space-between',
  width: 320,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

export const IconText = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const ChipContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

export const FeatureChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.75rem',
  borderRadius: '12px',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
}));
