import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Career() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedExtensions = ['pdf', 'doc', 'docx'];
      const ext = file.name.split('.').pop().toLowerCase();
      
      if (!allowedExtensions.includes(ext)) {
        setStatus({
          type: 'error',
          message: 'Unsupported file type. Please upload PDF, DOC, or DOCX.'
        });
        setResume(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setStatus({
          type: 'error',
          message: 'File size exceeds 5MB limit.'
        });
        setResume(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      setResume(file);
      setStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !resume) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields and upload your resume.'
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    const submissionData = new FormData();
    submissionData.append('name', formData.name);
    submissionData.append('email', formData.email);
    submissionData.append('phone', formData.phone);
    submissionData.append('message', formData.message);
    submissionData.append('resume', resume);

    try {
      // Ensure the loader stays active for at least 1500ms to show the upload progress transition
      const minLoaderDelay = new Promise((resolve) => setTimeout(resolve, 1500));

      const apiCall = fetch('http://localhost:5000/api/career', {
        method: 'POST',
        body: submissionData,
      });

      const [response] = await Promise.all([apiCall, minLoaderDelay]);
      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: data.message || 'Application submitted successfully!'
        });
        // Reset form
        setFormData({ name: '', email: '', phone: '', message: '' });
        setResume(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Submitting application failed. Please try again.'
        });
      }
    } catch (err) {
      console.error('API Error:', err);
      // Delay before showing fallback so loader is visible
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Local fallback simulation if backend server is offline
      setStatus({
        type: 'success',
        message: 'Mock Submission: App is in demo mode (Local server offline). We successfully validated your resume!'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="career" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase">Join Us</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Build Your Career With Us
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Ready to make an impact? Share your details and resume below. We are constantly looking for enthusiastic team players to join our growing HR firm.
          </p>
        </motion.div>

        {/* Clean, Backgroundless Form Container */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-8 text-left"
        >
          
          {/* Status Message Display */}
          {status.type && (
            <div className={`p-4 rounded-sm flex items-start space-x-3 ${
              status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {status.type === 'success' ? (
                <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              )}
              <span className="text-sm font-medium">{status.message}</span>
            </div>
          )}

          {/* Grid Layout for Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Name input */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-bold text-slate-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                className="px-4 py-3 border border-slate-200 focus:border-slate-900 focus:outline-hidden rounded-sm transition-colors text-slate-800 placeholder-slate-400 bg-transparent text-base"
              />
            </div>

            {/* Email input */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-bold text-slate-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
                className="px-4 py-3 border border-slate-200 focus:border-slate-900 focus:outline-hidden rounded-sm transition-colors text-slate-800 placeholder-slate-400 bg-transparent text-base"
              />
            </div>

            {/* Mobile number input */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm font-bold text-slate-700 mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="Enter your mobile number"
                className="px-4 py-3 border border-slate-200 focus:border-slate-900 focus:outline-hidden rounded-sm transition-colors text-slate-800 placeholder-slate-400 bg-transparent text-base"
              />
            </div>

          </div>

          {/* Message textarea */}
          <div className="flex flex-col">
            <label htmlFor="message" className="text-sm font-bold text-slate-700 mb-2">
              Tell Us About Yourself
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Why are you interested in joining ProDynamics?"
              className="px-4 py-3 border border-slate-200 focus:border-slate-900 focus:outline-hidden rounded-sm transition-colors text-slate-800 placeholder-slate-400 bg-transparent text-base resize-y"
            ></textarea>
          </div>

          {/* File Upload Section */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-slate-700 mb-2">
              Upload Resume (PDF, DOC, DOCX) <span className="text-red-500">*</span>
            </label>
            
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-slate-400 transition-colors rounded-sm p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50"
            >
              <UploadCloud className="h-10 w-10 text-slate-400 mb-3" />
              <span className="text-sm font-semibold text-slate-700">
                {resume ? resume.name : 'Click to select and upload resume'}
              </span>
              <span className="text-xs text-slate-500 mt-1">
                {resume ? `${(resume.size / 1024 / 1024).toFixed(2)} MB` : 'Max file size 5MB'}
              </span>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-sm shadow-xs transition-all duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
              <Send className="ml-2 h-4 w-4" />
            </button>
          </div>

        </motion.form>

      </div>
    </section>
  );
}
