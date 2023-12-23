const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 200,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"], // The enum property help to give the possible values the db expects
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId, // This allows us to tie every job to a user
      ref: "Users", // This represents the model we are referencing
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", JobSchema);
