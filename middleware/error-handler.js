const { StatusCodes } = require("http-status-codes");

// MONGOOSE ERRORS

// - Validation Errors: This is when user does not provide a required input field
// - Duplicate (Email): This is when an input that needs to be unique are duplicated
// - Cast Error: This occurs when an id or token is not in a the mongoose format

const errorHandleMiddleware = async (err, req, res, next) => {
  const customError = {
    message: err.message || "Something went wrong, try again later",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  // Condition, when any object key or value is not provided
  if (err.name == "ValidationError") {
    const error = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    // console.log(error);
    customError.message = error;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Condition, when a unique value is already present in the database
  if (err.code == 11000) {
    const error = Object.keys(err.keyValue);
    // console.log(error);
    customError.message = `${error[0]} has already existed`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Handling cast error
  if (err.name == "CastError") {
    customError.message = `The provided ID: ${err.value} is invalid`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
  });
  // res.status(customError.statusCode).json({
  //   success: false,
  //   message: err,
  // });
};

module.exports = errorHandleMiddleware;
