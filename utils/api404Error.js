const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./BaseError')

class Api404Error extends BaseError {
    constructor (
        statusCode = httpStatusCodes.NOT_FOUND,
        message =  'Not Found',
        isOperational = true
    ) {
        super(statusCode, message, isOperational, )
    }
}

module.exports = Api404Error