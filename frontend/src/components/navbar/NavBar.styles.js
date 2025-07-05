import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  Paper,
  Box,
  Typography,
} from "@mui/material";

export const StyledNavBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: "none",
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const LogoSection = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
}));

export const LogoIcon = styled("img")(({ theme }) => ({
  maxWidth: "6rem",
  height: "auto",
  marginRight: theme.spacing(2),
}));

export const NavLeft = styled("div")(({ theme }) => ({
  flex: 2,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: theme.spacing(2.5),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const NavRight = styled("div")(({ theme }) => ({
  flex: 2,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: theme.spacing(2.5),
}));

export const AuthSection = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  "&:hover": {
    color: "#b5b5b5",
    backgroundColor: "transparent",
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  width: 30,
  height: 30,
}));

export const NotificationButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

export const NotificationsPopperContainer = styled(Paper)(({ theme }) => ({
  width: 300,
  maxHeight: 360,
  overflowY: "auto",
  padding: theme.spacing(1),
  boxShadow: theme.shadows[3],
}));

export const NotificationItem = styled(Box)(({ theme, unread }) => ({
  padding: theme.spacing(1, 2),
  marginBottom: theme.spacing(0.5),
  backgroundColor: unread
    ? theme.palette.action.selected
    : theme.palette.background.paper,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const NotificationTitle = styled(Typography)(({ theme, unread }) => ({
  fontWeight: unread
    ? theme.typography.fontWeightBold
    : theme.typography.fontWeightRegular,
}));

export const NotificationMessage = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.25),
}));

export const NotificationTime = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.disabled,
  marginTop: theme.spacing(0.5),
  textAlign: "right",
}));

export const NotificationsViewAll = styled(Button)(({ theme }) => ({
  display: "block",
  margin: theme.spacing(1, "auto", 0),
}));
