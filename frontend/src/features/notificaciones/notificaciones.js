
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  CircularProgress,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import {
  NotificationsContainer,
  PageTitle,
  SectionTitle,
  NotificationItem,
  NotificationMessage,
  NotificationTime,
  ActionButton,
} from './notificaciones.styles';


const mock = [
  { id: 'a1', mensaje: 'Reserva confirmada', fechaAlta: '2025-06-22T18:30:00Z', leida: false },
  { id: 'b2', mensaje: 'Nuevo mensaje de Juan', fechaAlta: '2025-06-21T15:10:00Z', leida: false },
  { id: 'c3', mensaje: 'Pago recibido', fechaAlta: '2025-06-20T12:00:00Z', leida: true },
];

export default function NotificationsPage() {
  const { usuario } = useAuth();
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/usuarios/${usuario.id}/notificaciones`);
        if (!res.ok) throw new Error('API no disponible');
        const data = await res.json();
        setNotifications(data);
      } catch {
        setNotifications(mock);
      } finally {
        setLoading(false);
      }
    })();
  }, [usuario.id]);

  const marcarComoLeida = async (id) => {
    // marcar en backend
    try {
      await fetch(`/usuarios/${usuario.id}/notificaciones/${id}`, { method: 'PATCH' });
    } catch {}
    
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, leida: true } : n))
    );
    setSelected(prev => (prev?.id === id ? prev : prevNotification(id)));
  };


  const prevNotification = (id) => notifications.find(n => n.id === id);

  if (loading) {
    return (
      <NotificationsContainer sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </NotificationsContainer>
    );
  }

 
  const ordenadas = [...notifications].sort(
    (a, b) => new Date(b.fechaAlta) - new Date(a.fechaAlta)
  );
  const noLeidas = ordenadas.filter(n => !n.leida);
  const leidas   = ordenadas.filter(n => n.leida);

  return (
    <NotificationsContainer>
      <PageTitle variant="h4">Mis Notificaciones</PageTitle>

      <Box sx={{ display: 'flex', gap: 4 }}>
        
        <Box sx={{ flex: 1 }}>
          <SectionTitle variant="h6">
            No leídas ({noLeidas.length})
          </SectionTitle>
          {noLeidas.length === 0 && (
            <Typography color="text.secondary">No tenés notificaciones nuevas.</Typography>
          )}
          {noLeidas.map(n => (
            <NotificationItem
              key={n.id}
              unread={1}
              onClick={() => { marcarComoLeida(n.id); setSelected(n); }}
            >
              <NotificationMessage unread={1}>{n.mensaje}</NotificationMessage>
              <NotificationTime>
                {new Date(n.fechaAlta).toLocaleString()}
              </NotificationTime>
            </NotificationItem>
          ))}

          <Divider sx={{ my: 2 }} />

          <SectionTitle variant="h6">
            Leídas ({leidas.length})
          </SectionTitle>
          {leidas.length === 0 && (
            <Typography color="text.secondary">No hay notificaciones leídas aún.</Typography>
          )}
          {leidas.map(n => (
            <NotificationItem
              key={n.id}
              unread={0}
              onClick={() => setSelected(n)}
            >
              <NotificationMessage unread={0}>{n.mensaje}</NotificationMessage>
              <NotificationTime>
                {new Date(n.fechaAlta).toLocaleString()}
              </NotificationTime>
            </NotificationItem>
          ))}
        </Box>

        
        <Box sx={{ flex: 2, p: 2, border: '1px solid #ddd', borderRadius: 1, minHeight: 200 }}>
          {selected ? (
            <>
              <Typography variant="h5" gutterBottom>
                Detalle de notificación
              </Typography>
              <Typography sx={{ mb: 2 }}>{selected.mensaje}</Typography>
              <Typography variant="caption" color="text.disabled">
                Fecha: {new Date(selected.fechaAlta).toLocaleString()}
              </Typography>
            </>
          ) : (
            <Typography color="text.secondary">
              Seleccioná una notificación para ver su detalle.
            </Typography>
          )}
        </Box>
      </Box>
    </NotificationsContainer>
  );
}


  