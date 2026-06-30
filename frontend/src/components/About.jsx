import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutImg from '../assets/about_us.jpg';

export default function About() {
  return (
    <section id="about" className="py-28 bg-white min-h-[75vh] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            <div className="inline-flex items-center space-x-1.5 text-blue-600 font-semibold text-xs tracking-wider uppercase mb-4">
              <Compass className="h-4 w-4" />
              <span>Who We Are</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              About ProDynamics
            </h1>
            
            <div className="space-y-4 text-base text-slate-600 leading-relaxed max-w-2xl">
              <p>
                ProDynamics is a premier human resources advisory and recruitment agency dedicated to building high-performing teams and scalable organizational structures. We specialize in sourcing and deploying top-tier talent across the entire Microsoft Dynamics ecosystem, including D365 CRM, Finance & Operations (F&O), Business Central, and NAV.
              </p>
              <p>
                Our specialized recruiters leverage advanced screening methodologies and AI-powered productivity tools to align technical capability with organizational culture. Whether you require executive search, permanent placement, contract staffing, or AI-powered HR consulting, we deliver tailored solutions that propel corporate growth.
              </p>
            </div>
            
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-sm shadow-xs transition-all duration-200 cursor-pointer"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Glowing Ambient Backdrop */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-200/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-teal-200/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              
              <img
                src={aboutImg}
                alt="About ProDynamics Teamwork Illustration"
                className="relative z-10 w-full h-auto object-cover rounded-2xl shadow-xl border border-slate-100"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
