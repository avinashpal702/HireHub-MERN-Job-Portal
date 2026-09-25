// controllers/jobController.js
const Job = require('../models/Job');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc  Create a job (recruiter only)
// @route POST /api/jobs
exports.createJob = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    company,
    location,
    salary,
    jobType,
    experience,
    skills,
    category,
  } = req.body;
  const job = new Job({
    title,
    description,
    company,
    location,
    salary,
    jobType,
    experience,
    skills,
    category,
    recruiter: req.user.id,
  });
  await job.save();
  res.status(201).json(job);
});

// @desc  Get all jobs (public, supports pagination & filters)
exports.getJobs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, title, skill, company, location } = req.query;
  const query = {};
  if (title) query.title = { $regex: title, $options: 'i' };
  if (skill) query.skills = { $in: [skill] };
  if (company) query.company = { $regex: company, $options: 'i' };
  if (location) query.location = { $regex: location, $options: 'i' };

  const jobs = await Job.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate('recruiter', 'name email');

  const total = await Job.countDocuments(query);
  res.json({ total, page: Number(page), limit: Number(limit), jobs });
});

// @desc  Get single job
exports.getJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate('recruiter', 'name email');
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
});

// @desc  Update a job (owner recruiter or admin)
exports.updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  if (job.recruiter.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }
  Object.assign(job, req.body);
  await job.save();
  res.json(job);
});

// @desc  Delete a job
exports.deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  if (job.recruiter.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }
  await job.remove();
  res.json({ message: 'Job removed' });
});