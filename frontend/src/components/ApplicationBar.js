import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router";

const ApplicationBar = () => {
  const {estaAutenticado} = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Birbnb
        </Typography>

        {!estaAutenticado && (
          <Button color="inherit" onClick={handleLoginClick}>
            Ingresar
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default ApplicationBar;