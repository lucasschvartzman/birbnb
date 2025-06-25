import { styled } from '@mui/material/styles';
import { Box, Typography, Button, Paper } from '@mui/material';

// Container principal de la página
export const NotificationsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  margin: '0 auto',
}));

// Título principal
export const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

// Sección (No leídas / Leídas)
export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(1),
}));

// Cada notificación
export const NotificationItem = styled(Paper)(({ theme, unread }) => ({
  backgroundColor: unread
    ? theme.palette.action.selected
    : theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
}));

// Texto del mensaje
export const NotificationMessage = styled(Typography)(({ theme, unread }) => ({
  color: unread ? theme.palette.text.primary : theme.palette.text.secondary,
}));

// Fecha / hora
export const NotificationTime = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.disabled,
  marginTop: theme.spacing(0.5),
}));

// Botón de acción (“Marcar leída” o “Ver todas”)
export const ActionButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));
