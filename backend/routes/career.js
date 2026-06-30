import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import Career from '../models/Career.js';

const router = express.Router();
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
const FALLBACK_FILE = path.join(process.cwd(), 'submissions_fallback.json');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// File filter (accept PDF, DOC, DOCX)
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
});

router.post('/', upload.single('resume'), async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone) {
    // Delete uploaded file if validation failed
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ error: 'Name, email, and phone number are required' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Resume file is required' });
  }

  const resumeUrl = `${process.env.CLIENT_URL}/uploads/${req.file.filename}`;

  const submission = {
    name,
    email,
    phone,
    message: message || '',
    resumePath: resumeUrl,
    createdAt: new Date(),
  };

  // Attempt to save to MongoDB
  if (mongoose.connection.readyState === 1) {
    try {
      const career = new Career({
        name,
        email,
        phone,
        message: message || '',
        resumePath: resumeUrl,
      });
      await career.save();
      return res.status(201).json({
        success: true,
        message: 'Application submitted successfully. We will contact you soon.',
        data: career,
      });
    } catch (dbError) {
      console.error('Database save failed, writing to fallback JSON:', dbError);
    }
  }

  // Fallback to local JSON
  try {
    let submissions = [];
    if (fs.existsSync(FALLBACK_FILE)) {
      const rawData = fs.readFileSync(FALLBACK_FILE, 'utf8');
      submissions = JSON.parse(rawData || '[]');
    }
    submissions.push({ ...submission, type: 'career' });
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(submissions, null, 2), 'utf8');

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully. We will contact you soon.',
      data: submission,
    });
  } catch (fsError) {
    console.error('Fallback save failed:', fsError);
    // Cleanup file
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ error: 'Server error: unable to save career details' });
  }
});

// Custom error handling for multer limits/filters
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

export default router;
