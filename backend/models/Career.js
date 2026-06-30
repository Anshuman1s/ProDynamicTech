import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  resumePath: {
    type: String,
    required: [true, 'Resume file is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800, // Auto-delete after 7 days (604800 seconds)
  },
});

const Career = mongoose.model('Career', careerSchema);
export default Career;
