import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router";
import '../features/navbar/navbar.css'; // 
import {IconButton, Badge, Drawer, List, ListItem, ListItemText} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../assets/logo.png'; 

const ApplicationBar = () => {
  const {estaAutenticado, clearAuthContext} = useAuth();
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
      <ListItemText primary="Home" />
    </ListItem>

    {estaAutenticado && (
      <ListItem button component={Link} to="/reservas" onClick={toggleDrawer(false)}>
        <ListItemText primary="Reservas" />
      </ListItem>
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
    </div>

    {/* CENTRO: Navegación */}
    <div className="nav-center">

    {estaAutenticado && (<>
      <Button component={Link} to="/reservas" className="nav-button">Reservas</Button>
      <IconButton className="notif-button">
        <Badge badgeContent={3} color="error">
          <NotificationsIcon sx={{ color: '#ffffff' }} />
        </Badge>
      </IconButton></>)}
    </div>

    {/* DERECHA: Ingresar */}
    <div className="auth-button">
    {estaAutenticado ? (
      <Button color="inherit" className="nav-button" onClick={handleLogout}>
       Cerrar sesión
      </Button>
      ) : (
      <Button color="inherit"className="nav-button"  onClick={handleLoginClick}>
       Ingresar
      </Button>
    )}
    </div>


    {/* Drawer para mobile */}
    <IconButton
      edge="end"
      className="menu-button"
      onClick={toggleDrawer(true)}
    >
      <MenuIcon sx={{ display: { xs: 'block', md: 'none' }, color: '#ffffff' }} />
    </IconButton>
    
  </Toolbar>

  <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
    {drawerList}
  </Drawer>
</AppBar>

  );
}

export default ApplicationBar;