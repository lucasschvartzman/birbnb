import React from 'react';
import {
  TextField,
  Button,
} from '@mui/material';
import {
  FormContainer,
  PageContainer,
  StyledPaper,
  ButtonsContainer,
  Title,
} from './modificarReserva.styles';

const ModificarReservaPage = () => {
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
            <Button variant="outlined" color="inherit">
              Cancelar
            </Button>
            <Button variant="contained" color="primary">
              Guardar Cambios
            </Button>
          </ButtonsContainer>
        </FormContainer>
      </StyledPaper>
    </PageContainer>
  );
};

export default ModificarReservaPage;
