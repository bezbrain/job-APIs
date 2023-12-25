const JobCollection = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");

// Get All Jobs
const getAllJobs = async (req, res) => {
  const jobs = await JobCollection.find({ createdBy: req.user.userId }).sort(
    "-createdAt"
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: "All jobs fetched",
    jobsLength: jobs.length,
    jobs,
  });
};

// Get Single Job
const getSingleJob = async (req, res) => {
  const {
    user: { userId },
    params: { jobID },
  } = req;
  const job = await JobCollection.findOne({ _id: jobID, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`Job with the id, ${jobID} does not exist`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Single job fetched successfully",
    job,
  });
};

// Create Job
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

// Update Job
const updateJob = async (req, res) => {
  const {
    params: { jobID },
    user: { userId },
    body: { company, position },
  } = req;

  if (!company || !position) {
    throw new BadRequestError("Company or Position field cannot be empty");
  }

  const job = await JobCollection.findOneAndUpdate(
    { _id: jobID, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`Job with the id, ${jobID} does not exist`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Job updated successfully",
    job,
  });
};

// Delete Job
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { jobID },
  } = req;

  const job = await JobCollection.findOneAndDelete({
    _id: jobID,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`Job with the id, ${jobID} does not exist`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Job deleted successfully",
  });
};

module.exports = {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
};
