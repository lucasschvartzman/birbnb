import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Badge, Drawer, ListItemText, ListSubheader, Menu, MenuItem, Typography,Popper,ClickAwayListener, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { useAuth } from "../../context/AuthContext";
import { confirmLogout } from "../../utils/alerts"
import { useTheme } from '@mui/material/styles';

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
  NotificationsPopperContainer,
  NotificationItem,
  NotificationTitle,
  NotificationMessage,
  NotificationTime,
  NotificationsViewAll,
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

  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = open => () => setDrawerOpen(open);

  
  const [notifAnchor, setNotifAnchor] = useState(null);
  const openNotif = Boolean(notifAnchor);
  const handleNotifClick = e => setNotifAnchor(e.currentTarget);
  const handleNotifClose = () => setNotifAnchor(null);

  // Datos de notificaciones
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Reserva confirmada', message: 'Tu reserva #123 se confirmó.', time: '2h atrás', unread: true },
    { id: 2, title: 'Nuevo mensaje', message: 'Tienes un nuevo mensaje de Juan.', time: '5h atrás', unread: true },
    { id: 3, title: 'Pago recibido', message: 'Recibiste ARS 3500.', time: '1d atrás', unread: true },
  ]);
  const handleItemClick = id => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
    
  };

  
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
              
            <NotificationButton
              aria-describedby="notifications-popper"
              onClick={handleNotifClick}
            >
              <Badge badgeContent={notifications.filter(n => n.unread).length} color="error">
                <NotificationsIcon />
              </Badge>
            </NotificationButton>

            
            <Popper
              id="notifications-popper"
              open={openNotif}
              anchorEl={notifAnchor}
              placement="bottom-end"
              style={{ zIndex: 2000 }}
            >
              <ClickAwayListener onClickAway={handleNotifClose}>
                <NotificationsPopperContainer>
                  <Typography variant="h6" sx={{ px: 1, pb: 1 }}>
                    Notificaciones
                  </Typography>
                  {notifications.slice(0, 6).map(n => (
                    <NotificationItem
                      key={n.id}
                      unread={n.unread ? 1 : 0}
                      onClick={() => handleItemClick(n.id)}
                    >
                      <NotificationTitle unread={n.unread ? 1 : 0}>
                        {n.title}
                      </NotificationTitle>
                      <NotificationMessage>{n.message}</NotificationMessage>
                      <NotificationTime>{n.time}</NotificationTime>
                    </NotificationItem>
                  ))}
                  <NotificationsViewAll size="small" onClick={() => {/* navegar */}}>
                    Ver todas las notificaciones
                  </NotificationsViewAll>
                </NotificationsPopperContainer>
              </ClickAwayListener>
            </Popper>

            
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