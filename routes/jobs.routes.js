const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs.controller");

router.get("/jobs", getAllJobs);
router.get("/jobs/:jobID", getSingleJob);
router.patch("/jobs", updateJob);
router.delete("/jobs", deleteJob);

module.exports = router;
