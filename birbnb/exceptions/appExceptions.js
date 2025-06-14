export class AppException extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // Por qué este status? no entiendo qué les aporta, se podría boletear
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.esOperacional = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
