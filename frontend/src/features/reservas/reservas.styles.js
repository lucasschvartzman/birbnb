import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  padding: 24,
  maxWidth: 1200,
  margin: '0 auto',
}));

export const Titulo = styled('h4')(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  marginBottom: 32,
  textAlign: 'left',
  span: {
    color: theme.palette.secondary.main,
  },
}));

export const CardsSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(3),
  justifyContent: 'center',
}));
