const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs.controller");

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:jobID", getSingleJob);
router.patch("/:jobID", updateJob);
router.delete("/:jobID", deleteJob);

module.exports = router;
