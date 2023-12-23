const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const UnauthorizedError = require("../errors/unauthorized");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError(
      "Token does not exist or not in the right format"
    );
  }

  // Now, let us verify the token if it is correct
  const extractToken = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(extractToken, process.env.JWT_SECRET);
    const { _id, name } = payload;
    next();
  } catch (error) {
    throw new UnauthorizedError("Not authorized to access this route");
  }
};

module.exports = authMiddleware;
