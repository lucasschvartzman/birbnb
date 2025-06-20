import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton,
  Badge, Button, Drawer, List, ListItem, ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import logo from '../../../public/images/logo.png'; 
import { Link } from 'react-router-dom';
import '../navbar/navbar.css';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const drawerList = (
    <List className="drawer-list">
      <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/reservas" onClick={toggleDrawer(false)}>
        <ListItemText primary="Reservas" />
      </ListItem>
    </List>
  );

  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar className="toolbar">

         <div className="logo-section">
            <img src={logo} alt="BRBNB Logo" className="logo-icon" />
         </div>


          <div className="nav-links">
            <Button component={Link} to="/" className="nav-button">Home</Button>
            <Button component={Link} to="/reservas" className="nav-button">Reservas</Button>
            <IconButton className="notif-button">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon sx={{ color: '#ffffff' }} />
              </Badge>
            </IconButton>
          </div>

          <IconButton
            edge="end"
            className="menu-button"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={{display: { xs: 'block', md: 'none' }, color: '#ffffff',}}/>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </>
  );
};

export default Navbar;
