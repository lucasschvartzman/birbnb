import { Button } from "@mui/material"

const BotonBirbnb = ({children}) => {
//TODO 
// Este component es solo un copy del boton de la busqueda de alojamiento, 
// no sé si amerita su propio componente
// Si en todos los botones vamos a poner el estilo con SX en vez de en el css,
// Entonces deberíamos usar este component
// Si decidimos poner todo el estilo en el css y quitar el SX,
// entonces este componente no tiene sentido

    return (
        <Button
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "#f48fb1",
          "&:hover": {
            backgroundColor: "#f8bbd0",
          },
        }}
      >
        {children}
      </Button>
    )
}

export default BotonBirbnb