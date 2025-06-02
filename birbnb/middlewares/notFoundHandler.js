export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: "La ruta solicitada no existe."
    });
};