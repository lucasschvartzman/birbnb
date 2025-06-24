import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, useTheme } from "@mui/material";
import { useReserva } from "../../context/ReservaContext";
import { formatMoneda } from "../../utils/format";
import {
  confirmCancelReservationForm,
  showErrorReservation,
  showSuccessReservation,
} from "../../utils/alerts";
import { StyledCard, FormContainer, ButtonsContainer, Title } from "./FormPutReserva.styles";

export const FormPutReserva = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    alojamientoSeleccionado,
    datosReserva,
    actualizarDatosReserva,
    calcularPrecioTotal,
    limpiarReserva,
  } = useReserva();

  const handleInputChange = (campo, valor) => {
    actualizarDatosReserva({ [campo]: valor });
  };

  const handleCancelar = () => {
    confirmCancelReservationForm(theme).then((res) => {
      if (res.isConfirmed) {
        navigate("/");
      }
    });
  };

  const handleGuardarCambios = () => {
    //Si se pudo guardar
    showSuccessReservation(theme);
    navigate("/reservas");
    //else
    //showErrorReservation(theme)
  };

  const precioTotal = calcularPrecioTotal();
  console.log(alojamientoSeleccionado);
  return (
    <StyledCard>
      <Title m="5" sx={{ p: 3 }} variant="h5">
        Reservar Alojamiento
      </Title>
      <FormContainer sx={{ p: 3 }} m="5" component="form">
        <TextField
          label="Cantidad de huéspedes"
          type="number"
          fullWidth
          value={datosReserva.cantidadHuespedes}
          onChange={(e) =>
            handleInputChange("cantidadHuespedes", parseInt(e.target.value))
          }
          InputProps={{
            inputProps: {
              min: 1,
              max: alojamientoSeleccionado.cantHuespedesMax,
            },
          }}
          helperText={`Máximo ${alojamientoSeleccionado.cantHuespedesMax} huéspedes`}
        />

        <TextField
          label="Fecha de inicio"
          type="date"
          fullWidth
          value={datosReserva.fechaInicio}
          onChange={(e) => handleInputChange("fechaInicio", e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: new Date().toISOString().split("T")[0] }}
        />

        <TextField
          label="Fecha de fin"
          type="date"
          fullWidth
          value={datosReserva.fechaFin}
          onChange={(e) => handleInputChange("fechaFin", e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            min:
              datosReserva.fechaInicio ||
              new Date().toISOString().split("T")[0],
          }}
        />

        {precioTotal > 0 && (
          <Box sx={{ mt: 2, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
            <Typography variant="h6" color="primary">
              Precio Total: {precioTotal.toLocaleString()}{" "}
              {formatMoneda(alojamientoSeleccionado.moneda)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.ceil(
                (new Date(datosReserva.fechaFin) -
                  new Date(datosReserva.fechaInicio)) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              noche(s) ×{" "}
              {alojamientoSeleccionado.precioPorNoche.toLocaleString()}{" "}
              {formatMoneda(alojamientoSeleccionado.moneda)}
            </Typography>
          </Box>
        )}

        <ButtonsContainer>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: theme.palette.text.secondary,
              color: theme.palette.background.paper,
              "&:hover": {
                backgroundColor: theme.palette.text.primary,
              },
            }}
            onClick={handleCancelar}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGuardarCambios}
            disabled={!(precioTotal > 0)}
          >
            Confirmar Reserva
          </Button>
        </ButtonsContainer>
      </FormContainer>
    </StyledCard>
  );
};

export default FormPutReserva;
