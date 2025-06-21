import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

export const HeaderContainer = styled(Box)(({ theme }) => ({
  height: '60vh',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(2),
  color: '#fff',
  overflow: 'hidden',
  backgroundImage: `url('/images/home-background.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

export const HeaderOverlay = styled(Box)(({ theme }) => ({
  content: '""',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 0,
}));

export const HeaderContent = styled(Box)(({ theme }) => ({
  zIndex: 1,
  position: 'relative',
}));

export const HeaderButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  marginTop: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
  },
}));