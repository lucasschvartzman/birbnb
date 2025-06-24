import React, { createContext, useContext, useState } from 'react';

const ReservaContext = createContext();

export const useReserva = () => {
  const context = useContext(ReservaContext);
  if (!context) {
    throw new Error('useReserva debe ser usado dentro de un ReservaProvider');
  }
  return context;
};

export const ReservaProvider = ({ children }) => {
  const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState(null);
  const [datosReserva, setDatosReserva] = useState({
    cantidadHuespedes: 1,
    fechaInicio: '',
    fechaFin: '',
  });

  const seleccionarAlojamiento = (alojamiento) => {
    setAlojamientoSeleccionado(alojamiento);
    setDatosReserva({
      cantidadHuespedes: 1,
      fechaInicio: '',
      fechaFin: '',
    });
  };

  const actualizarDatosReserva = (nuevosDatos) => {
    setDatosReserva(prev => ({ ...prev, ...nuevosDatos }));
  };

  const limpiarReserva = () => {
    setAlojamientoSeleccionado(null);
    setDatosReserva({
      cantidadHuespedes: 1,
      fechaInicio: '',
      fechaFin: '',
    });
  };

  const calcularPrecioTotal = () => {
    if (!alojamientoSeleccionado || !datosReserva.fechaInicio || !datosReserva.fechaFin) {
      return 0;
    }

    const fechaInicio = new Date(datosReserva.fechaInicio);
    const fechaFin = new Date(datosReserva.fechaFin);
    const diasEstancia = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
    
    return diasEstancia * alojamientoSeleccionado.precioPorNoche;
  };

  const value = {
    alojamientoSeleccionado,
    datosReserva,
    seleccionarAlojamiento,
    actualizarDatosReserva,
    limpiarReserva,
    calcularPrecioTotal,
  };

  return (
    <ReservaContext.Provider value={value}>
      {children}
    </ReservaContext.Provider>
  );
};
