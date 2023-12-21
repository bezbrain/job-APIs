const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty"],
    trim: true,
    minlength: [3, "Character cannot be less than 3"],
    maxlength: [50, "Characters cannot be more than 50"],
  },

  email: {
    type: String,
    required: [true, "Email cannot be empty"],
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password cannot be empty"],
    minlength: [6, "Character cannot be less than 6"],
  },
});

// USING THE MONGOOSE MIDDLEWARE TO HANDLE HASHING OF PASSWORD
// Try to use the ES5 function syntax and not arrow function. The callback function is used to achieve something (which is hashin a password in this case) before saving the document
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Users", UserSchema);
