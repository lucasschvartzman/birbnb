import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import LogoutIcon from '@mui/icons-material/Logout';
import { ListSubheader, Menu, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { confirmLogout } from "../../utils/alerts";
import NotificationsPopper from './NotificationsPopper'; // Importa el nuevo componente

import {
  AuthSection,
  LogoIcon,
  LogoSection,
  NavButton,
  NavRight,
  NotificationButton,
  StyledAvatar,
  StyledNavBar,
  StyledToolbar
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

  const handleLoginClick = () => navigate('/login');
  const handleLogout = () =>
    confirmLogout(theme).then(res => {
      if (res.isConfirmed) {
        clearAuthContext();
        navigate('/');
      }
    });

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
      </StyledToolbar>
    </StyledNavBar>
  );
};

export default NavBar;
