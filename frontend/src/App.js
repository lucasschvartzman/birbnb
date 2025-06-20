import Home from "./features/home/Home";
import Layout from "./features/layout/Layout";
import Login from "./features/login/Login";

import {BrowserRouter, Route, Routes} from "react-router";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({

});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
