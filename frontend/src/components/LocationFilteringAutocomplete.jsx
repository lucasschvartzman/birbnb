import { Autocomplete, TextField } from "@mui/material";


const LocationFilteringAutocomplete = () => {

  return (
    <Autocomplete
      disablePortal
      options={locaciones}
      sx={{
          backgroundColor: "#fff",
          minWidth: 320,
        }}
      variant="outlined"
      renderInput={(params) => (
        <TextField {...params} label="Buscar por lugar" />
      )}
    />
  );
};

//TODO BORRAR ESTE HARDCODE
//TODO esto debería venir así del backend, no sé si aquí o desde el padre
// const locaciones = await apiGetLocaciones()
const locaciones = [
  { label: "Argentina", type: "PAIS", id: "aowe9uqx" },
  { label: "Chacharramendi, Argentina", type: "PAIS", id: "aowe9uqx" },
  { label: "Mercedes, Argentina", type: "CIUDAD", id: "aowe9uqx" },
  { label: "Brasil", type: "PAIS", id: "3avredvasd" },
  { label: "Rio de Janeiro, Brasil", type: "CIUDAD", id: "aowe9uqx" },
  { label: "Punta del Este, Paraguay", type: "CIUDAD", id: "aowe9uqx" },
  { label: "Bolivia", type: "PAIS", id: "aowe9uqx" },
  { label: "Canadá", type: "PAIS", id: "aowe9uqx" },
  { label: "Ontario, Canadá", type: "PAIS", id: "aowe9uqx" },
];

export default LocationFilteringAutocomplete;
