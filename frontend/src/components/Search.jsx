import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import AlojamientoBasicFilters from "./AlojamientoBasicFilters";
import FiltrosCaracteristicasSidebar from "./FiltrosCaracteristicasSidebar";

const Search = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", px: 4, pb: 3 }}>
        <span style={{ color: "#f48fb1" }}>Alojamientos</span> Disponibles
      </Typography>

      <Box sx={{padding: 2 }}>
        <AlojamientoBasicFilters />
      </Box>
      <Box sx={{ mt: 2, display: "flex" }}>
        <Box sx={{ width: 350,  padding: 2 }}>
          <FiltrosCaracteristicasSidebar />
        </Box>
        <Box sx={{ flex: 1, padding: 2 }}>
          <Box
            sx={{
              height:1000, //TODO borrar, esto se ajusta automaticamente
              backgroundColor: "#f8bbd0",
              display: "flex",
              justifyContent: "center",
              alignItems: "top",
              color: "#333",
              borderRadius: "8px",
            }}
          >
            Seria la vista por defecto de todos los alojamientos
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
