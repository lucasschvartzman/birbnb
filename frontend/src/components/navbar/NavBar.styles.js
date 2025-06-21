import { styled } from '@mui/material/styles';
import {AppBar, Toolbar, Button, IconButton, List, Avatar, ListItem} from '@mui/material';

export const StyledNavBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: 'none',
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const LogoSection = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
}));

export const LogoIcon = styled('img')(({ theme }) => ({
  maxWidth: '6rem',
  height: 'auto',
  marginRight: theme.spacing(2),
}));

export const NavLeft = styled('div')(({ theme }) => ({
  flex: 2,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(2.5),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const NavRight = styled('div')(({ theme }) => ({
  flex: 2,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: theme.spacing(2.5),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const AuthSection = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  '&:hover': {
    color: '#b5b5b5',
    backgroundColor: 'transparent',
  },
}));

export const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  height: 30,
  width: 30,
  color: theme.palette.primary.contrastText,
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const DrawerList = styled(List)(({ theme }) => ({
  width: 200,
  padding: theme.spacing(2.5),
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  width: 30,
  height: 30,
}));

export const NotificationButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiListItemText-primary': {
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: '0.95rem',
  },
}));