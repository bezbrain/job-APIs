const { StatusCodes } = require("http-status-codes");

const errorHandleMiddleware = (err, req, res, next) => {
  const customError = {
    message: err.message,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
  });
};

module.exports = errorHandleMiddleware;
