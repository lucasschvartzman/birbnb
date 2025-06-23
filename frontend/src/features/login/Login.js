import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from "../../api/api";
import { useAuth } from '../../context/AuthContext';
import { showErrorAlert, showSuccessLoginAlert } from '../../utils/alerts';
import { LoginPage, LoginPaper, Logo } from './Login.styles';

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
    showErrorAlert();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!email.trim() || !password.trim()) {
      showErrorAlert();
      return;
    }
    
    try {
      const usuario = await login(email, password);
      setAuthContext(usuario);
      showSuccessLoginAlert(usuario);
      navigate('/');
    } catch (error) {
      handleLoginError();
    }
  };

  return (
    <LoginPage>
      <LoginPaper elevation={5}>
        <Logo src="/images/logo-dark.png" alt="Birbnb" />
        <form onSubmit={handleFormSubmit} style={{ width: '100%' }} noValidate>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            autoComplete="email"
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ marginTop: 2 }}
            disabled={!email.trim() || !password.trim()}
          >
            Ingresar
          </Button>
        </form>
      </LoginPaper>
    </LoginPage>
  );
};

export default Login;