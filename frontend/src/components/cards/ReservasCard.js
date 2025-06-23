import React from "react";
import { useTheme } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupsIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/Event";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Person2Icon from "@mui/icons-material/Person2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import {
  StyledCard,
  IconText,
  ChipContainer,
  colorEstado,
} from "./ReservasCard.style";

const calcularTotal = (precioPorNoche, fechaInicio, fechaFin) => {
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  const diffTime = Math.abs(fin - inicio);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays * precioPorNoche;
};

export const ReservasCard = ({ reserva }) => {
  const theme = useTheme();

  const handleCancelar = (id) => {
    console.log("Cancelar reserva:", id);
  };

  const handleModificar = (id) => {
    console.log("Modificar reserva:", id);
  };

  return (
    <StyledCard variant="outlined">
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {reserva.alojamiento}
        </Typography>

        <IconText>
          <LocationOnIcon fontSize="small" />
          {reserva.direccion}
        </IconText>

        <IconText>
          <Person2Icon fontSize="small" />
          Anfitrión: {reserva.anfitrion}
        </IconText>

        <IconText>
          <EventIcon fontSize="small" />
          {reserva.fechaInicio} a {reserva.fechaFin}
        </IconText>

        <IconText>
          <GroupsIcon fontSize="small" />
          {reserva.cantidadHuespedes} huésped
          {reserva.cantidadHuespedes > 1 ? "es" : ""}
        </IconText>

        <IconText>
          <AttachMoneyIcon fontSize="small" />
          Precio por noche: ${reserva.precioPorNoche}
        </IconText>

        <IconText>
          <MonetizationOnIcon fontSize="small" />
          Total: $
          {calcularTotal(
            reserva.precioPorNoche,
            reserva.fechaInicio,
            reserva.fechaFin
          )}
        </IconText>

        <ChipContainer>
          <Chip
            label={`Estado: ${reserva.estado}`}
            sx={{
              bgcolor:
                colorEstado(theme)[reserva.estado] || theme.palette.grey[400],
              color: theme.palette.common.white,
              fontWeight: "bold",
            }}
          />
        </ChipContainer>
      </CardContent>

      {reserva.estado !== "Cancelada" && (
        <CardActions sx={{ justifyContent: "center", mb: 1.5 }}>
          <Button
            variant="outlined"
            sx={(theme) => ({
              color: theme.palette.modify.main,
              borderColor: theme.palette.modify.main,
              px: 1,
            })}
            onClick={() => handleModificar(reserva.id)}
          >
            <EditIcon fontSize="small" sx={{ mr: 0.5 }}></EditIcon>
            Modificar
          </Button>
          <Button
            variant="outlined"
            sx={(theme) => ({
              color: theme.palette.error.main,
              borderColor: theme.palette.error.main,
              px: 1,
            })}
            onClick={() => handleCancelar(reserva.id)}
          >
            <DeleteIcon fontSize="small" sx={{ mr: 0.5 }}></DeleteIcon>
            Cancelar
          </Button>
        </CardActions>
      )}
    </StyledCard>
  );
};

export default ReservasCard;
