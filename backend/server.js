import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import contactRoutes from './routes/contact.js';
import careerRoutes from './routes/career.js';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;
const MONGO_URI = process.env.MONGO_URI 

// Ensure uploads folder exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors({
  origin:process.env.CLIENT_URL,
  credentials:true
}));
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

async function seedAdmins() {
  try {
    const adminEmails = [
      'info@prodynamicstechnologies.com',
      'prerna@prodynamictechnologies.com'
    ];
    const password = 'prodynamic@technologies7887';

    for (const email of adminEmails) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          email: email.toLowerCase(),
          password: hashedPassword,
        });
        await newUser.save();
        console.log(`Seeded admin user: ${email}`);
      }
    }
  } catch (error) {
    console.error('Error seeding admin users:', error);
  }
}

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    seedAdmins();
  })
  .catch((err) => {
    console.error('------------------------------------------------------------');
    console.error('Warning: Could not connect to MongoDB.');
    console.error('The server will continue running using local JSON fallback.');
    console.error(`Details: ${err.message}`);
    console.error('------------------------------------------------------------');
  });

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/admin', adminRoutes);

// Health/Status Endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

// Root Endpoint
app.get('/', (req, res) => {
  res.send('ProDynamics HR Portal API is running.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
