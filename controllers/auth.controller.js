const UserCollection = require("../models/Users");
const { StatusCodes } = require("http-status-codes");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  const token = jwt.sign({ userId: user._id, name: user.name }, "jwtSecret", {
    expiresIn: "30d",
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    user: { name: user.name },
    token,
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
