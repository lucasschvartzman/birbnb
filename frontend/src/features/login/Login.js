import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import "./Login.css"
import {Box, Paper, TextField, Button, Typography} from '@mui/material';
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

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
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password
      });
      const idUsuario = response.data.idUsuario;
      login(idUsuario);
      navigate('/');
    } catch (error) {
      // Siempre va a fallar porque el endpoint no existe, asi que sigo con un ID falso.
      const idUsuario = 12345;
      login(idUsuario);
      navigate('/');
    }
  };

  return (
    <div className={"login-page"}>
      <Box>
        <Paper elevation={5} sx={{padding:4}}>
          <Typography align="center">Logo de Birbnb</Typography>
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