// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');

router
  .route('/')
  .get(getJobs) // public list
  .post(protect, authorize('recruiter', 'admin'), createJob); // protected create

router
  .route('/:id')
  .get(getJob)
  .put(protect, authorize('recruiter', 'admin'), updateJob)
  .delete(protect, authorize('recruiter', 'admin'), deleteJob);

module.exports = router;