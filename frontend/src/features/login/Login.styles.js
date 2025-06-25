import {styled} from "@mui/material/styles";
import {Paper, Typography} from "@mui/material";

export const LoginPage = styled('div')({
  background: 'url("/images/login-background.jpg") no-repeat center center fixed',
  backgroundSize: 'cover',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const LoginPaper = styled(Paper)({
  display: 'flex',
  width: '25rem',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
});

export const Logo = styled('img')({
  width: '10rem',
  height: 'auto',
  marginTop: '0.5rem',
  marginBottom: '1rem',
});