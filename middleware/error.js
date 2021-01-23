const ErrorResponse = require('../utils/error_response')
const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message
    console.log('Error', error);

    //Mongoose wrong ObjectId
    if (error.name === 'CastError') {
        const message = `Bad Mongoose ObjectId ${error.value}`;
        error = new ErrorResponse(message, 404)
    }

    //Mongoose duplicate key error
    if (error.code === 11000) {
        const message = 'Duplicate field value entered!'
        error = new ErrorResponse(message, 400)//status is 400 because bad request from client

    }
    //Mongoose validation error

    if (error.name === "ValidationError") {
        const message = Object.values(err.errors);
        console.log('Messages', message)
        error = new ErrorResponse(message, 400)
    }





    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })

}
module.exports = errorHandler