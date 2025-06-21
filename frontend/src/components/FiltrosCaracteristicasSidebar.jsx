import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BotonBirbnb from "./BotonBirbnb";

const FiltrosCaracteristicasSidebar = () => {
  const [filtros, setFiltros] = useState(filtrosIniciales);
  
  const handleCambio = (index) => {
    const nuevosFiltros = [...filtros];
    nuevosFiltros[index].checked = !nuevosFiltros[index].checked;
    setFiltros(nuevosFiltros);
};

return (
    <Accordion defaultExpanded sx={{padding: 4, boxShadow: 2, borderRadius: 2}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">
            {"Filtrar por características:"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {filtros.map((filtro, i) => (
            <FormControlLabel
              key={filtro.id}
              control={
                <Checkbox
                  checked={filtro.checked}
                  onChange={() => handleCambio(i)}
                  />
              }
              label={filtro.label}
              />
            ))}
        </AccordionDetails>
        <BotonBirbnb>Aplicar</BotonBirbnb>
      </Accordion>
  );
};

//TODO BORRAR ESTE HARDCODE
//TODO 
//esto debería venir así del backend, no sé si aquí o desde el padre
//el checked:false podría agregarse aqui o junto con la llamada al axios, either way is fine
//
// const filtrosIniciales = await apiGetCaracteristicas()
const filtrosIniciales = [
  { label: "Estacionamiento", id: "12345", checked: false },
  { label: "Playa", id: "12345", checked: false },
  { label: "WIFI", id: "12345", checked: false },
  { label: "Admite Mascotas", id: "12345", checked: false },
  { label: "Cancha de fútbol", id: "12345", checked: false },
  { label: "Desayuno", id: "12345", checked: false },
  { label: "Más caracterísitcas xd", id: "12345", checked: false },
];

export default FiltrosCaracteristicasSidebar;
