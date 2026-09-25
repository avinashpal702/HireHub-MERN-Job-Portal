// controllers/applicationController.js
const Application = require('../models/Application');
const Job = require('../models/Job');
const { asyncHandler } = require('../middleware/errorMiddleware');
const path = require('path');
const fs = require('fs');

// @desc  Candidate applies to a job (multipart/form-data for resume)
exports.apply = asyncHandler(async (req, res) => {
  const { jobId, coverLetter } = req.body;
  const candidate = req.user.id;

  const job = await Job.findById(jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });

  const newApp = new Application({
    candidate,
    job: jobId,
    coverLetter,
    resume: req.file?.path, // multer stores the path
  });
  await newApp.save();

  // optional: push reference to job.applicants
  job.applicants.push(newApp._id);
  await job.save();

  res.status(201).json(newApp);
});

// @desc  Recruiter view applicants for a job
exports.getApplicants = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId).populate({
    path: 'applicants',
    populate: { path: 'candidate', select: 'name email resume' },
  });
  if (!job) return res.status(404).json({ message: 'Job not found' });

  // Only recruiter of this job or admin
  if (job.recruiter.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }
  res.json(job.applicants);
});

// @desc  Update applicant status (recruiter/admin)
exports.updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params; // application id
  const { status } = req.body;
  const app = await Application.findById(id).populate('job');
  if (!app) return res.status(404).json({ message: 'Application not found' });

  // Only the job recruiter or admin can change status
  if (app.job.recruiter.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }
  app.status = status;
  await app.save();
  res.json(app);
});