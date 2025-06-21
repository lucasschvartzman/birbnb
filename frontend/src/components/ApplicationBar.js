import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import '../features/navbar/navbar.css'; // 
import { IconButton, Badge, Drawer, List, ListItem, ListItemText, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../assets/logo.png';

const ApplicationBar = () => {
  const { estaAutenticado, clearAuthContext } = useAuth();
  
  //para la inicial
  const { email } = useAuth();
  const inicial = email?.charAt(0).toUpperCase() || '?';


  // Estado para el menu de logo icono
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/login');
  }
  const handleLogout = () => {
    clearAuthContext();
    navigate('/');
  }

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const drawerList = (
    <List className="drawer-list">
      <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
        <ListItemText primary="Home" primaryTypographyProps={{ style: { color: 'black' } }} />
      </ListItem>

      {!estaAutenticado && (
        <ListItem button component={Link} to="/login" onClick={toggleDrawer(false)}>
          <ListItemText primary="Ingresar" primaryTypographyProps={{ style: { color: 'black' } }} />
        </ListItem>
      )}

      {estaAutenticado && (
        <>
          <ListItem button component={Link} to="/reservas" onClick={toggleDrawer(false)}>
            <ListItemText primary="Reservas" primaryTypographyProps={{ style: { color: 'black' } }} />
          </ListItem>
        </>
      )}
    </List>
  );


  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="toolbar">

        {/* IZQUIERDA: Logo */}
        <div className="logo-section">
          <Link to="/">
            <img src="images/logo-light.png" alt="Birbnb" className="logo-icon" />
          </Link>

          <div className="nav-left">
            {estaAutenticado && (<>
              <Button component={Link} to="/reservas" className="nav-button">Reservas</Button>
            </>)}
          </div>
        </div>

        {/* DERECHA: Ingresar */}
        <div className="auth-button">
          {estaAutenticado ? (
            <>
              <IconButton className="notif-button">
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon sx={{ color: '#ffffff' }} />
                </Badge>
              </IconButton>

              {/* Avatar con menú */}
              <IconButton onClick={handleMenuOpen}>
                <Avatar sx={{ bgcolor: '#f48fb1', width: 30, height: 30 }}>{inicial}</Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                disableScrollLock={true}
                onClose={handleMenuClose}>

                <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>
                  <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div className='nav-right'>
              <Button color="inherit" className="nav-button" onClick={handleLoginClick}>Ingresar</Button>
            </div>
          )}


        </div>


        {/* Drawer para mobile */}
        <IconButton
          edge="end"
          className="menu-button"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon sx={{ color: '#ffffff' }} />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </AppBar>

  );
}

export default ApplicationBar;