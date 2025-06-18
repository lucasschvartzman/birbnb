export class AppException extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.esOperacional = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
