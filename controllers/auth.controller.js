const register = async (req, res) => {
  res.send("Register a user");
};

const login = async (req, res) => {
  res.send("Login a user");
};

module.exports = {
  register,
  login,
};
