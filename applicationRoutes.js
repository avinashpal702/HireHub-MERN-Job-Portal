// routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, authorize } = require('../middleware/authMiddleware');
const { apply, getApplicants, updateStatus } = require('../controllers/applicationController');

// Multer config – store uploads in ./uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// Candidate applies (needs file upload for resume)
router.post('/apply', protect, authorize('candidate'), upload.single('resume'), apply);

// Recruiter view applicants for a specific job
router.get('/job/:jobId', protect, authorize('recruiter', 'admin'), getApplicants);

// Recruiter/admin change status
router.patch('/:id/status', protect, authorize('recruiter', 'admin'), updateStatus);

module.exports = router;