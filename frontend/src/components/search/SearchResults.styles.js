import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ResultsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(3),
  justifyContent: 'center',
  marginTop: theme.spacing(4),
}));