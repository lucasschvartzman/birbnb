import Home from "./features/home/Home";
import Layout from "./features/layout/Layout";
import Login from "./features/login/Login";
import Reservas from "./features/reservas/Reservas";
import ModificarReserva from "./features/reservas/modificarReserva";

import { BrowserRouter, Route, Routes } from "react-router";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
  palette: {
    primary: {
      main: '#232323',
      light: '#454545',
      dark: '#1a1a1a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f48fb1',
      light: '#f8bbd9',
      dark: '#f06292',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    modify: {
      main: '#7FB3D5'
    },
    success: { main: '#81c784' },
    warning: { main: '#ffb74d' },
    error: { main: '#e57373' },
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/modificarReserva" element={<ModificarReserva />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
