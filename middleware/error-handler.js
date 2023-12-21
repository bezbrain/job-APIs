const { StatusCodes } = require("http-status-codes");

const errorHandleMiddleware = async (err, req, res, next) => {
  const customError = {
    message: err.message,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  // Condition, when any object key or value is not provided
  if (err.name == "ValidationError") {
    const error = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    // console.log(error);
    customError.message = error;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Condition, when a unique value is already present in the database
  if (err.code == 11000) {
    const error = Object.keys(err.keyValue);
    // console.log(error);
    customError.message = `${error[0]} needs to be unique`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
  });
};

module.exports = errorHandleMiddleware;
