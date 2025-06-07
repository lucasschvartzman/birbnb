export const exceptionHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'dev') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        if (err.esOperacional) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        } else {
            console.error('[ERROR]: ', err);
            res.status(500).json({
                status: 'error',
                message: 'Ocurrió un error inesperado.'
            });
        }
    }
};