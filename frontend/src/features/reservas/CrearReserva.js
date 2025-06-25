import { Box } from "@mui/material";
import { useReserva } from "../../context/ReservaContext";
import AlojamientoPreview from "../../components/cards/AlojamientoPreview";
import FormPutReserva from "./FormPutReserva";

const CrearReserva = () => {
  const {
    alojamientoSeleccionado,
  } = useReserva();

  return (
    <Box
      sx={{
        alignContent: "center",
        alignSelf: "center",
        flexDirection: "row",
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
        pb: 7,
        mt: 4,
      }}
    >
      <AlojamientoPreview alojamiento={alojamientoSeleccionado} />
      <FormPutReserva />
    </Box>
  );
};

export default CrearReserva;
