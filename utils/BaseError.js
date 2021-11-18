class BaseError extends Error {
    constructor(statusCode, message, isOperational = true, stack = '') {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype)
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = BaseError;