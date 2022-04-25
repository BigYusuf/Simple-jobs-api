const { StatusCodes } = require('http-status-codes');
const {CustomAPIError} = require('../errors');

const notFoundMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg: err.message});
    }
    return res.status(StatusCodes.NOT_FOUND).json({ err });
}

module.exports = notFoundMiddleware;