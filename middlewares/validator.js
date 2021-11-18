const Joi = require("joi");
const BaseError = require('../utils/BaseError')
const httpStatus = require('../utils/httpStatusCodes');

function createAccountSchema(req, res, next) {
    // create schema object
    const schema = Joi.object().keys({
        startDate: Joi.date().iso(),
        endDate: Joi.date().iso(),
        minCount: Joi.number().integer(),
        maxCount: Joi.number().integer(),
    });

    validateRequest(req, next, schema);
}

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new BaseError(httpStatus.BAD_REQUEST, errorMessage));

    } else {
        req.body = value;
        next();
    }
}

module.exports = createAccountSchema;