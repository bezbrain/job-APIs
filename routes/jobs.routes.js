const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs.controller");

router.get("/", getAllJobs);
router.get("/:jobID", getSingleJob);
router.post("/", createJob);
router.patch("/:jobID", updateJob);
router.delete("/:jobID", deleteJob);

module.exports = router;
