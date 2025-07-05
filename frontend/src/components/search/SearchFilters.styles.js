import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

export const FiltersContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const FilterRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  alignItems: 'center',
}));

export const FilterGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const CoordenadasContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

export const SliderContainer = styled(Box)(({ theme }) => ({
  width: 200,
  minHeight: 56,
  '& .MuiSlider-root': {
    color: theme.palette.secondary.main,
  }
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

export const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
  },
}));

export const ClearButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.text.secondary,
  color: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.text.primary,
  },
}));