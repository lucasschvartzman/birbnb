import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const SearchContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

export const SearchTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  paddingBottom: theme.spacing(3),
  textAlign: 'left',
  '& span': {
    color: theme.palette.secondary.main,
  }
}));

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
}));