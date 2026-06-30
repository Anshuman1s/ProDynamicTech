import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, CheckCircle2 } from 'lucide-react';

const privacyBullets = [
  {
    title: "Data Collection",
    text: "We collect personal details (such as names, email addresses, phone numbers, and resumes) only when voluntarily submitted through our career application or contact forms."
  },
  {
    title: "Use of Information",
    text: "Collected data is strictly used to match candidates with employment opportunities, process career applications, and respond to client inquiries."
  },
  {
    title: "Data Security",
    text: "We implement industry-standard physical and electronic security protocols to safeguard candidate resumes and contact details against unauthorized access, loss, or disclosure."
  },
  {
    title: "Third-Party Sharing",
    text: "Candidate details and resumes are only shared with prospective employers and clients after receiving explicit, written consent from the candidate."
  },
  {
    title: "User Rights",
    text: "You hold the right to request access to the personal data we store, request corrections to inaccuracies, or request complete removal of your records from our systems at any time."
  }
];

const termsBullets = [
  {
    title: "Acceptance of Terms",
    text: "By accessing the ProDynamics website or submitting candidate applications, you agree to comply with and be bound by these corporate terms of service."
  },
  {
    title: "Permitted Use",
    text: "Our recruitment portals and forms must only be used for legitimate career applications and business consulting inquiries; automated crawling, scraping, or spamming is strictly prohibited."
  },
  {
    title: "Accuracy of Information",
    text: "Users must guarantee that all resume materials, work histories, credentials, and contact details submitted to our advisors are completely accurate and truthful."
  },
  {
    title: "Limitation of Liability",
    text: "ProDynamics acts as a recruitment intermediary and is not liable for candidate performance, employment terms, or commercial disputes arising between hired personnel and client organizations."
  },
  {
    title: "Amendments",
    text: "We reserve the right to modify these terms and our operating policies at any time, with updates immediately effective upon publication on our web platform."
  }
];

export default function Legal() {
  return (
    <section id="legal" className="py-28 bg-white min-h-[75vh] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase">Compliance & Guidelines</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4">
            Privacy & Terms of Service
          </h1>
          <p className="text-slate-500 text-base">
            Please read our Privacy Policy and Terms of Service carefully to understand how we protect your personal information and outline key operational guidelines.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Privacy Policy Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-slate-50 border border-slate-100 rounded-2xl p-8 lg:p-10 shadow-xs"
          >
            <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-slate-200/60">
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Privacy Policy</h2>
            </div>
            
            <ul className="space-y-6">
              {privacyBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-1">{bullet.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{bullet.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Terms of Service Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-50 border border-slate-100 rounded-2xl p-8 lg:p-10 shadow-xs"
          >
            <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-slate-200/60">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Terms of Service</h2>
            </div>
            
            <ul className="space-y-6">
              {termsBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-1">{bullet.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{bullet.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
