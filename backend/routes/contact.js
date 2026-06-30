import express from 'express';
import Contact from '../models/Contact.js';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const router = express.Router();
const FALLBACK_FILE = path.join(process.cwd(), 'submissions_fallback.json');

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'Name, email, phone number, and message are required' });
  }

  const submission = { name, email, phone, message, createdAt: new Date() };

  // Attempt to save to MongoDB if connected
  if (mongoose.connection.readyState === 1) {
    try {
      const contact = new Contact({ name, email, phone, message });
      await contact.save();
      return res.status(201).json({
        success: true,
        message: 'Message sent successfully. We will contact you soon.',
        data: contact,
      });
    } catch (dbError) {
      console.error('Database save failed, writing to fallback JSON:', dbError);
    }
  }

  // Fallback to local JSON file if DB is not connected or fails
  try {
    let submissions = [];
    if (fs.existsSync(FALLBACK_FILE)) {
      const rawData = fs.readFileSync(FALLBACK_FILE, 'utf8');
      submissions = JSON.parse(rawData || '[]');
    }
    submissions.push({ ...submission, type: 'contact' });
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(submissions, null, 2), 'utf8');
    
    return res.status(201).json({
      success: true,
      message: 'Message sent successfully. We will contact you soon.',
      data: submission,
    });
  } catch (fsError) {
    console.error('Fallback save failed:', fsError);
    return res.status(500).json({ error: 'Server error: unable to save contact details' });
  }
});

export default router;
