import { styled } from '@mui/material/styles';
import { Box, Container, Paper, Typography } from '@mui/material';

export const PageContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(6),
  display: 'flex',
  justifyContent: 'center',
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 600,
  backgroundColor: theme.palette.background.paper,
}));

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  color: theme.palette.primary.main,
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2),
}));
