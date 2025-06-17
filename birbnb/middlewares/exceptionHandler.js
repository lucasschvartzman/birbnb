export const exceptionHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === 'dev') {
        res.status(err.statusCode).json({
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        if (err.esOperacional) {
            res.status(err.statusCode).json({
                message: err.message
            });
        } else {
            console.error('[ERROR]: ', err);
            res.status(500).json({
                message: 'Ocurrió un error inesperado.'
            });
        }
    }
};