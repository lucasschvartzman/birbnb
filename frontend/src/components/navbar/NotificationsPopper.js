import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Typography, Popper, ClickAwayListener } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  NotificationButton,
  NotificationsPopperContainer,
  NotificationItem,
  NotificationTitle,
  NotificationMessage,
  NotificationTime,
  NotificationsViewAll,
} from './NavBar.styles'; // Ajusta la ruta según tu estructura

const NotificationsPopper = (iniciales) => {
  const [notifAnchor, setNotifAnchor] = useState(null);
  const openNotif = Boolean(notifAnchor);
  const handleNotifClick = e => setNotifAnchor(e.currentTarget);
  const handleNotifClose = () => setNotifAnchor(null);

  // Datos de notificaciones - podrías mover esto a un contexto o hook personalizado
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Reserva confirmada', message: 'Tu reserva #123 se confirmó.', time: '2h atrás', unread: true },
    { id: 2, title: 'Nuevo mensaje', message: 'Tienes un nuevo mensaje de Juan.', time: '5h atrás', unread: true },
    { id: 3, title: 'Pago recibido', message: 'Recibiste ARS 3500.', time: '1d atrás', unread: true },
  ]);

  const handleItemClick = id => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <NotificationButton
        aria-describedby="notifications-popper"
        onClick={handleNotifClick}
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </NotificationButton>

      <Popper
        id="notifications-popper"
        open={openNotif}
        anchorEl={notifAnchor}
        placement="bottom-end"
        style={{ zIndex: 2000 }}
      >
        <ClickAwayListener onClickAway={handleNotifClose}>
          <NotificationsPopperContainer>
            <Typography variant="h6" sx={{ px: 1, pb: 1 }}>
              Notificaciones
            </Typography>
            {notifications.slice(0, 6).map(n => (
              <NotificationItem
                key={n.id}
                unread={n.unread ? 1 : 0}
                onClick={() => handleItemClick(n.id)}
              >
                <NotificationTitle unread={n.unread ? 1 : 0}>
                  {n.title}
                </NotificationTitle>
                <NotificationMessage>{n.message}</NotificationMessage>
                <NotificationTime>{n.time}</NotificationTime>
              </NotificationItem>
            ))}
            <Link to="/notificaciones" style={{ textDecoration: 'none' }}>
              <NotificationsViewAll size="small">
                Ver todas las notificaciones
              </NotificationsViewAll>
            </Link>
          </NotificationsPopperContainer>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default NotificationsPopper;
