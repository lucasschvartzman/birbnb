import {useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {useNavigate} from 'react-router';
import {Box, Button, TextField} from '@mui/material';
import {login} from "../../api/api";
import {LoginPage, LoginPaper, Logo, ErrorMessage} from './Login.styles';

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
      const usuario = await login(email, password);
      setAuthContext(usuario);
      navigate('/');
    } catch (error) {
      handleLoginError();
    }
  };

  return (
    <LoginPage>
      <LoginPaper elevation={5}>
        <Logo src="/images/logo-dark.png" alt="Birbnb" />

        {loginError && (
          <ErrorMessage variant="body2">
            Acceso inválido. Por favor, inténtelo otra vez.
          </ErrorMessage>
        )}

        <Box sx={{ width: '100%' }}>
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
      </LoginPaper>
    </LoginPage>
  );
};

export default Login;