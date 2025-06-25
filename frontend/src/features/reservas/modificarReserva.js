import { TextField, Button, useTheme } from "@mui/material";
import {
  FormContainer,
  PageContainer,
  StyledPaper,
  ButtonsContainer,
  Title,
} from "./modificarReserva.styles";
import {
  confirmCancelReservationForm,
  showSuccessReservation,
} from "../../utils/alerts";
import { useNavigate } from "react-router";

const ModificarReservaPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleCancelar = () => {
    confirmCancelReservationForm(theme).then((res) => {
      if (res.isConfirmed) {
        navigate("/reservas");
      }
    });
  };

  const handleGuardarCambios = () => {
    //TODO
    //GUARDAR RESERVA AL BACKEND

    //if se pudo guardar
    showSuccessReservation(theme);
    navigate("/reservas");
    //else
    //showErrorReservation(theme)
  };
  return (
    <PageContainer>
      <StyledPaper elevation={3}>
        <Title variant="h5">Modificar Reserva</Title>

        <FormContainer component="form">
          <TextField
            label="Cantidad de huéspedes"
            type="number"
            fullWidth
            InputProps={{ inputProps: { min: 1 } }}
          />

          <TextField
            label="Fecha de inicio"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Fecha de fin"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

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
            >
              Guardar Cambios
            </Button>
          </ButtonsContainer>
        </FormContainer>
      </StyledPaper>
    </PageContainer>
  );
};

export default ModificarReservaPage;
