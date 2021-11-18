const BaseError = require('../utils/BaseError')
const logger = require('../utils/logger')
const config = require('../config/config')


const returnError = (err, req, res, next) => {
    const response = {
        code: err.statusCode,
        msg: err.message
    };

    if (config.env === 'development') {
        logger.error(err);
    }

    res.status(err.statusCode || 500).send(response);

};

function isOperationalError(error) {
    if (error instanceof BaseError) {
        return error.isOperational
    }
    return false
}

module.exports = {
    returnError,
    isOperationalError
}
