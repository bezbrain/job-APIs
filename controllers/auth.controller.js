const UserCollection = require("../models/Users");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");
// const bcrypt = require("bcryptjs");

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
  const token = user.createJWT();

  // Response
  res.status(StatusCodes.CREATED).json({
    success: true,
    user: { name: user.name },
    token,
    message: "User created successfully",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await UserCollection.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Email does not exist");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  // Compare password
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Password does not match");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    success: true,
    user: { name: user.name },
    token,
    message: "Login successful",
  });
};

module.exports = {
  register,
  login,
};
