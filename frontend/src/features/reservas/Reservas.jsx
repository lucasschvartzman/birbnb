import React from 'react';
import ReservasCard from '../../components/cards/ReservasCard';  
import { Container, Titulo, CardsSection } from '../../components/reservas/reservas.styles';

const reservasMock = [
  {
    id: 1,
    alojamiento: "Departamento en Palermo",
    fechaInicio: "2025-06-21",
    fechaFin: "2025-06-25",
    cantidadHuespedes: 2,
    precioPorNoche: 3000,
    estado: "Aceptada",
    direccion: "Calle Falsa 123, Palermo",
    anfitrion: "Juan Perez",
  },
  {
    id: 2,
    alojamiento: "Casa en Mar del Plata",
    fechaInicio: "2025-07-01",
    fechaFin: "2025-07-07",
    cantidadHuespedes: 4,
    precioPorNoche: 5000,
    estado: "Pendiente",
    direccion: "Av. Siempre Viva 742, Mar del Plata",
    anfitrion: "Maria Lopez",
  },
  {
    id: 3,
    alojamiento: "Monoambiente en Recoleta",
    fechaInicio: "2025-06-28",
    fechaFin: "2025-07-02",
    cantidadHuespedes: 1,
    precioPorNoche: 2000,
    estado: "Cancelada",
    direccion: "Av. Libertador 500, Recoleta",
    anfitrion: "Carlos Gomez",
  },
];

const Reservas = () => {
  const handleCancelar = (id) => {
    console.log('Cancelar reserva:', id);
  };

  return (
    <Container>
      <Titulo>
        Mis <span>Reservas</span>
      </Titulo>

      <CardsSection>
        {reservasMock.map((reserva) => (
          <ReservasCard key={reserva.id} reserva={reserva} onCancelar={handleCancelar} />
        ))}
      </CardsSection>
    </Container>
  );
};

export default Reservas;
