import {styled} from "@mui/material/styles";
import {Box, Chip} from "@mui/material";

export const CaracteristicasContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  gap: 4
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.secondary.contrastText,
  flexShrink: 0
}))