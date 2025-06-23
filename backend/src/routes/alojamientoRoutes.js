import { AlojamientoController } from "../controllers/alojamientoController.js";

export function registerAlojamiento(app, getController) {
  const controller = getController(AlojamientoController);

  /**
   * @swagger
   * /alojamientos:
   *   get:
   *     summary: Obtiene alojamientos según filtros
   *     tags:
   *     - Alojamientos
   *     parameters:
   *     - in: query
   *       name: pagina
   *       schema:
   *         type: integer
   *         description: El numero de pagina a consultar
   *     - in: query
   *       name: tamanioPagina
   *       schema:
   *         type: integer
   *         description: El numero de resultados por pagina
   *     - in: query
   *       name: idPais
   *       schema:
   *         type: string
   *         description: El id hexadecimal del pais del alojamiento
   *     - in: query
   *       name: idCiudad
   *       schema:
   *         type: string
   *         description: El id hexadecimal de la ciudad del alojamiento
   *     - in: query
   *       name: latitud
   *       schema:
   *         type: number
   *         description: La latitud de las coordenadas del alojamiento
   *     - in: query
   *       name: longitud
   *       schema:
   *         type: number
   *         description: La longitud de las coordenadas del alojamiento
   *     - in: query
   *       name: precioMinimo
   *       schema:
   *         type: string
   *         description: El minimo de precio a buscar
   *     - in: query
   *       name: precioMaximo
   *       schema:
   *         type: string
   *         description: El máximo de precio a buscar
   *     - in: query
   *       name: huespedes
   *       schema:
   *         type: string
   *         description: La cantidad de huespedes que el alojamiento debe ser capaz de recibir
   *     - in: query
   *       name: caracteristicas
   *       schema:
   *         type: string
   *         description: las características deseadas del alojamiento, separadas por comas
   *     description:
   *     responses:
   *       500:
   *         description: Error interno del servicio.
   *       200:
   *         description: Alojamientos que cumplen los requisitos.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   nombre:
   *                     type: string
   *                   descripcion:
   *                     type: string
   *                   ciudad:
   *                     type: string
   *                   calle:
   *                     type: string
   *                   altura:
   *                     type: number
   *                   coordenadas:
   *                     type: object
   *                     properties:
   *                       latitud:
   *                         type: number
   *                       longitud:
   *                         type: number
   *                   precioPorNoche:
   *                     type: number
   *                   cantHuespedesMax:
   *                     type: number
   *                   moneda:
   *                     type: string
   *                   horarioCheckIn:
   *                     type: string
   *                   horarioCheckOut:
   *                     type: string
   *                   caracteristicas:
   *                     type: array
   *                     items:
   *                       type: string
   */
  app.get("/alojamientos", (req, res, next) => {
    controller.buscarAlojamientosConFiltros(req, res, next);
  });
}
