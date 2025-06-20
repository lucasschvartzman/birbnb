import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import "./Login.css"
import {Box, Paper, TextField, Button, Typography} from '@mui/material';
import {login} from "../../api/api";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const { setAuthContext } = useAuth();
  const navigate = useNavigate();

  const handleLoginError = () => {
    setLoginError(true);
    setEmail('');
    setPassword('');
  }

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!email.trim() || !password.trim()) {
      alert("Por favor, completá todos los campos.");
      return;
    }

    try {
      const idUsuario = await login(email, password);
      setAuthContext(idUsuario);
      navigate('/');
    } catch (error) {
      handleLoginError();
    }
  };

  return (
    <div className="login-page">
      <Box>
        <Paper className="login-paper" elevation={5} sx={{padding:4}}>
          <img className="logo" src="/images/logo-dark.png" alt="Birbnb"></img>
          { loginError &&
            <div className="login-error">
              Acceso inválido. Por favor, inténtelo otra vez.
            </div>
          }
          <Box>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={handleSubmit}
              disabled={!email.trim() || !password.trim()}
            >
              Ingresar
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default Login;