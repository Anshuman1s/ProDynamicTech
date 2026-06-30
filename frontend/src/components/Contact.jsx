import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields.'
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: data.message || 'Message sent successfully!'
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.'
        });
      }
    } catch (err) {
      console.error('API Error:', err);
      // Local fallback simulation if server is offline
      setStatus({
        type: 'success',
        message: 'Mock Submission: Message sent successfully! (Demo fallback mode)'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-slate-100 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase">Contact Us</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Get In Touch With Our Experts
          </h2>
          <p className="mt-4 text-slate-500 text-base max-w-xl mx-auto">
            Have a question about our consulting packages or recruitment search process? Reach out today, and our team will get back to you shortly.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-4 flex flex-col justify-between bg-slate-50 p-8 rounded-sm border border-slate-100"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
              <p className="text-slate-500 text-sm mb-8">
                Ready to align your organization’s talent with your strategic vision? Contact us to set up a scoping call.
              </p>
              
              <div className="space-y-6">
                
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 flex items-center justify-center bg-blue-100 text-blue-700 rounded-sm shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Us</p>
                    <a href="mailto:info@prodynamics.com" className="text-sm font-medium text-slate-900 hover:text-blue-600">
                      info@prodynamicstechnologies.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 flex items-center justify-center bg-blue-100 text-blue-700 rounded-sm shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Call Us</p>
                    <a href="tel:+18005550199" className="text-sm font-medium text-slate-900 hover:text-blue-600">
                     987654321
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 flex items-center justify-center bg-blue-100 text-blue-700 rounded-sm shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Office Address</p>
                    <p className="text-sm font-medium text-slate-900 leading-snug">
                      Indore,<br />Madhya Pradesh, India
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Micro details */}
            <div className="mt-12 pt-6 border-t border-slate-200/50 text-left text-xs text-slate-400">
              Hours: Mon - Fri (8:00 AM - 6:00 PM PST)
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Name */}
                <div className="flex flex-col">
                  <label htmlFor="contact-name" className="text-sm font-bold text-slate-700 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    className="px-4 py-3 border border-slate-200 focus:border-slate-900 focus:outline-hidden rounded-sm transition-colors text-slate-800 placeholder-slate-400 bg-transparent text-base"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="contact-email" className="text-sm font-bold text-slate-700 mb-2">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                    className="px-4 py-3 border border-slate-200 focus:border-slate-900 focus:outline-hidden rounded-sm transition-colors text-slate-800 placeholder-slate-400 bg-transparent text-base"
                  />
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col">
                  <label htmlFor="contact-phone" className="text-sm font-bold text-slate-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your mobile number"
                    className="px-4 py-3 border border-slate-200 focus:border-slate-900 focus:outline-hidden rounded-sm transition-colors text-slate-800 placeholder-slate-400 bg-transparent text-base"
                  />
                </div>

              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label htmlFor="contact-message" className="text-sm font-bold text-slate-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="How can we help your business?"
                  className="px-4 py-3 border border-slate-200 focus:border-slate-900 focus:outline-hidden rounded-sm transition-colors text-slate-800 placeholder-slate-400 bg-transparent text-base resize-y"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-sm shadow-xs transition-all duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-4 w-4" />
                </button>
              </div>

            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
