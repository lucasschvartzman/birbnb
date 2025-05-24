import { Caracteristica } from "../models/entities/Caracteristica.js";

const mapearCaracteristicas = (caracteristicas) => {
    if (!caracteristicas) 
        return caracteristicas
    const caracteristicasValidas = Caracteristica.getAllAsString();
    const arrayDeCaracteristicas = caracteristicas.trim().split(",");
    return arrayDeCaracteristicas.filter((c) => caracteristicasValidas.includes(c.trim()))
}

const esStringValido = (valor) => {
    return typeof valor === 'string' && valor.trim().length !== 0
} 

const esNumeroPositivo = (valor) => {
    return !isNaN(valor) && valor > 0
}

const validarParametros = (queryParameters) => {
    const errores = []
    if (queryParameters.idCiudad && !esStringValido(queryParameters.idCiudad))
        errores.push('El parámetro "ciudad" debe ser un string válido')
    if (queryParameters.idPais && !esStringValido(queryParameters.idPais))
        errores.push('El parámetro "pais" debe ser un string válido')
    if (queryParameters.precioMinimo && !esNumeroPositivo(queryParameters.precioMinimo))
        errores.push('El parámetro "precioMinimo" debe ser un número positivo');
    if (queryParameters.precioMaximo && !esNumeroPositivo(queryParameters.precioMaximo))
        errores.push('El parámetro "precioMaximo" debe ser un número positivo'); 
    if (queryParameters.latitud && isNaN(queryParameters.latitud) )
        errores.push(mensajeErrorStringInvalido("coordLatitud"))  
    if (queryParameters.longitud && isNaN(queryParameters.latitud))
        errores.push(mensajeErrorStringInvalido("coordLongitud"))
    if (queryParameters.huespedes && (!esNumeroPositivo(queryParameters.huespedes||!Number.isInteger(queryParameters.huespedes))))
        errores.push('El parámetro "huespedes" debe ser un número entero positivo');
    if (queryParameters.caracteristicas && !esStringValido(queryParameters.caracteristicas)) 
        errores.push('El parámetro "caracteristicas" debe ser un string válido')
    if (errores.length > 0) {
        throw new Error(`Errores de validación en los parámetros: ${JSON.stringify(errores)}`);
    }

    return true;
};

const deRestARepo = (queryParameters) => {
    return {
        idCiudad: queryParameters.idCiudad, //si busco por ciudad, omitir la busqueda por pais
        idPais: queryParameters.idPais,
        latitud: queryParameters.latitud,
        longitud: queryParameters.longitud,
        precioMinimo: queryParameters.precioMinimo,
        precioMaximo: queryParameters.precioMaximo,
        huespedes: queryParameters.huespedes,
        caracteristicas: mapearCaracteristicas(queryParameters.caracteristicas),
    }
}
const deRepoARest = (alojamiento) => {
    return {
        nombre: alojamiento.nombre,
        descripcion: alojamiento.descripcion,
        ciudad: alojamiento.direccion.ciudad, //si busco por ciudad, omitir la busqueda por pais
        calle: alojamiento.direccion.calle,
        altura: alojamiento.direccion.altura,
        coordenadas: {
            latitud: alojamiento.direccion.latitud,
            longitud: alojamiento.direccion.longitud},
        precioPorNoche: alojamiento.precioPorNoche,
        cantHuespedesMax: alojamiento.cantHuespedesMax,
        moneda: alojamiento.moneda,
        horarioCheckIn: alojamiento.horarioCheckIn,
        horarioCheckOut: alojamiento.horarioCheckOut,
        caracteristicas: alojamiento.caracteristicas,
    }
}
export class AlojamientoController {
    
    constructor(alojamientoRepository ) {
        this.alojamientoRepository = alojamientoRepository;
    }

    async buscarAlojamientosConFiltros(req, res) {
        try {
            validarParametros(req.query)
            const criterios = deRestARepo(req.query)
            const pagina = req.query.pagina || 1
            const tamanioPagina = req.query.tamanioPagina || 25
            const alojamientos = await this.alojamientoRepository.findAll(criterios, {pagina, tamanioPagina})
            const jsonRespuesta = alojamientos.map(deRepoARest)
            res.status(200).json(jsonRespuesta)
        } catch (error) {
            console.error(error)
            res.status(500).json({
                error: error.message,
            })
        }
    }
}