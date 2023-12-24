const JobCollection = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");

const getAllJobs = async (req, res) => {
  //
};

const getSingleJob = async (req, res) => {
  res.send("Single Job");
};

const createJob = async (req, res) => {
  // Create a new property key on req.body. This property key would represent the user ID
  req.body.createdBy = req.user.userId;

  const job = await JobCollection.create(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Job created successfully",
    job,
  });
};

const updateJob = async (req, res) => {
  res.send("Update Job");
};

const deleteJob = async (req, res) => {
  res.send("Delete Job");
};

module.exports = {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
};
