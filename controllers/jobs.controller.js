const createJob = async (req, res) => {
  res.send("Create Jobs");
};

const getAllJobs = async (req, res) => {
  res.send("All Jobs");
};

const getSingleJob = async (req, res) => {
  res.send("Single Job");
};

const updateJob = async (req, res) => {
  res.send("Update Job");
};

const deleteJob = async (req, res) => {
  res.send("Delete Job");
};
// const getAllJobs =async(req, res)=> {
//     res.send("All Jobs")
// }

module.exports = {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
};
