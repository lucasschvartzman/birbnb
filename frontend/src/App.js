import Home from "./features/home/Home";
import Layout from "./features/layout/Layout";
import Login from "./features/login/Login";
import Reservas from "./features/reservas/Reservas";

import {BrowserRouter, Route, Routes} from "react-router";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/reservas" element={<Reservas />} />
            </Route>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
