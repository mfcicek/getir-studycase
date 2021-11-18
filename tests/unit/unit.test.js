const config = require('../../config/config');
const BaseError = require("../../utils/BaseError");
const httpStatus = require("../../utils/httpStatusCodes");
const httpMocks = require('node-mocks-http');
const {returnError} = require("../../middlewares/errorHandler");


it('It returns the api error ', () => {
    config.env = 'production';
    const error = new BaseError(httpStatus.BAD_REQUEST, 'Any error');
    const res = httpMocks.createResponse();
    const sendSpy = jest.spyOn(res, 'send');

    returnError(error, httpMocks.createRequest(), res);

    expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
            code: error.statusCode,
            msg: error.message,
        }),
    );
    config.env = process.env.NODE_ENV;
});