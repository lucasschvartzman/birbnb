export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        message: "La ruta solicitada no existe."
    });
};