import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Drawer, ListItemText, ListSubheader, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { useAuth } from "../../context/AuthContext";
import { confirmLogout } from "../../utils/alerts"
import { useTheme } from '@mui/material/styles';
import NotificationsPopper from './NotificationsPopper'; // Importa el nuevo componente

import {
  AuthSection,
  DrawerList,
  LogoIcon,
  LogoSection,
  MobileMenuButton,
  NavButton,
  NavRight,
  NotificationButton,
  StyledAvatar,
  StyledListItem, 
  StyledNavBar,
  StyledToolbar,
} from './NavBar.styles';

const NavBar = () => {
  const { usuario, estaAutenticado, clearAuthContext } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const iniciales = usuario ? (() => {
    const nombreCompleto = usuario.nombre.trim().split(' ');
    const nombre = nombreCompleto[0]?.[0] || '';
    const apellido = nombreCompleto[1]?.[0] || '';
    return nombre + apellido;
  })() : "";

  // Menú de usuario
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = e => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Drawer móvil
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = open => () => setDrawerOpen(open);

  const handleLoginClick = () => navigate('/login');
  const handleLogout = () =>
    confirmLogout(theme).then(res => {
      if (res.isConfirmed) {
        clearAuthContext();
        navigate('/');
      }
    });

  const drawerList = (
    <DrawerList>
      {!estaAutenticado && (
        <StyledListItem button component={Link} to="/login" onClick={toggleDrawer(false)}>
          <ListItemText primary="Ingresar" />
        </StyledListItem>
      )}

      {estaAutenticado && (
        <StyledListItem button component={Link} to="/reservas" onClick={toggleDrawer(false)}>
          <ListItemText primary="Reservas" />
        </StyledListItem>
      )}
    </DrawerList>
  );

  return (
    <StyledNavBar position="static">
      <StyledToolbar>

        <LogoSection>
          <Link to="/">
            <LogoIcon src="images/logo-light.png" alt="Birbnb" />
          </Link>
        </LogoSection>

        <AuthSection>
          {estaAutenticado ? (
            <>
              <NotificationsPopper params={iniciales}/>
              <NotificationButton onClick={handleMenuOpen}>
                <StyledAvatar>{iniciales}</StyledAvatar>
              </NotificationButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                disableScrollLock
              >
                  <ListSubheader sx={{ m: 0.3 }}>
                    <Typography>
                      <strong>{usuario.nombre}</strong>
                    </Typography>
                  </ListSubheader>
                  <MenuItem component={Link} to="/reservas">
                    <EditCalendarIcon fontSize="small" sx={{ mr: 1 }} />
                    Mis reservas
                  </MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                    Cerrar sesión
                  </MenuItem>
                </Menu>
            </>
          ) : (
            <NavRight>
              <NavButton onClick={handleLoginClick}>
                Ingresar
              </NavButton>
            </NavRight>
          )}
        </AuthSection>

        <MobileMenuButton
          edge="end"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </MobileMenuButton>
      </StyledToolbar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList}
      </Drawer>
    </StyledNavBar>
  );
};

export default NavBar;
