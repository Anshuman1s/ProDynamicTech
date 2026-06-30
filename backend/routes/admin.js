import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Contact from '../models/Contact.js';
import Career from '../models/Career.js';

const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error during login' });
  }
});

// Get all submissions (Contact and Career)
router.get('/submissions', async (req, res) => {
  const adminEmail = req.headers['x-admin-email'];

  const allowedAdmins = [
    'info@prodynamicstechnologies.com',
    'prerna@prodynamictechnologies.com'
  ];

  if (!adminEmail || !allowedAdmins.includes(adminEmail.toLowerCase())) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    const careers = await Career.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      contacts,
      careers,
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return res.status(500).json({ error: 'Server error: unable to fetch submissions' });
  }
});

export default router;
