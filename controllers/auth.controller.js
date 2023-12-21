const UserCollection = require("../models/Users");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  // const { password } = req.body;

  // Hash the password
  // const salt = await bcrypt.genSalt(10); // The random byte
  // const hashedPassword = await bcrypt.hash(password, salt);

  // const tempUser = {
  //   ...req.body,
  //   password: hashedPassword,
  // };

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
