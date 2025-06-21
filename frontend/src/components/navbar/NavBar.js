import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router';
import {Badge, Drawer, ListItemText, ListSubheader, Menu, MenuItem, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import {useAuth} from "../../context/AuthContext";

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
  StyledListItem, StyledNavBar,
  StyledToolbar,
} from './NavBar.styles';

const NavBar = () => {
  const {usuario, estaAutenticado, clearAuthContext} = useAuth();
  const navigate = useNavigate();

  const iniciales = usuario ? (() => {
    const nombreCompleto = usuario.nombre.trim().split(' ');
    const nombre = nombreCompleto[0]?.[0] || '';
    const apellido = nombreCompleto[1]?.[0] || '';
    return nombre + apellido;
  })() : "";

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLoginClick = () => navigate('/login');
  const handleLogout = () => {
    clearAuthContext();
    navigate('/');
  };
  const toggleDrawer = (open) => () => setDrawerOpen(open);

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
              <NotificationButton>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </NotificationButton>

              <NotificationButton onClick={handleMenuOpen}>
                <StyledAvatar>{iniciales}</StyledAvatar>
              </NotificationButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                disableScrollLock={true}
                onClose={handleMenuClose}
              >
                <ListSubheader sx={{m:0.3}}>
                  <Typography>
                    <strong>{usuario.nombre}</strong>
                  </Typography>
                </ListSubheader>
                <MenuItem component={Link} to="/reservas">
                  <EditCalendarIcon fontSize="small" sx={{ mr: 1 }}/>
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