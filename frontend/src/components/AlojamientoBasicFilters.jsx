import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Slider,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationFilteringAutocomplete from "./LocationFilteringAutocomplete";
import BotonBirbnb from "./BotonBirbnb";

const AlojamientoBasicFilters = () => {
  const [precio, setPrecio] = useState([0, 100000]);

  const handlePrecioChange = (event, newValue) => {
    setPrecio(newValue);
  };

  return (
    <Box sx={{ padding: 4, boxShadow: 2, borderRadius: 2 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <LocationFilteringAutocomplete />
        <TextField
          type="date"
          label="Desde"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          type="date"
          label="Hasta"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="Huéspedes"
          type="number"
          sx={{maxWidth:100}}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <Box sx={{ width: 200 }}>
          <Typography gutterBottom>Precio por noche</Typography>
          <Slider
            value={precio}
            onChange={handlePrecioChange}
            valueLabelDisplay="auto"
            min={0}
            max={100000}
          />
        </Box>
      </Box>

      <BotonBirbnb>
        Buscar
      </BotonBirbnb>
    </Box>
  );
};

export default AlojamientoBasicFilters;
