const UserCollection = require("../models/Users");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const user = await UserCollection.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    success: true,
    user,
    message: "User created successfully",
  });
};

const login = async (req, res) => {
  res.send("Login a user");
};

module.exports = {
  register,
  login,
};
