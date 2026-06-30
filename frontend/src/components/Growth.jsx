import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import peopleGrowthImg from '../assets/people_growth.jpg';

export default function Growth() {
  return (
    <section id="growth" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Centered) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center space-x-1.5 text-blue-600 font-semibold text-xs tracking-wider uppercase">
            <Sparkles className="h-4 w-4" />
            <span>Core Philosophy</span>
          </div>
        </motion.div>

        {/* Grid Layout for Content & Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Growth Starts with <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">Great People</span>
            </h2>

            <div className="space-y-4 text-base text-slate-600 leading-relaxed max-w-2xl">
              <p>
                At ProDynamics, we believe that true organizational momentum isn't driven by systems alone—it is powered by the talent and dedication of your people. Finding, hiring, and scaling technical talent requires a strategic approach that connects technical competence with cultural compatibility.
              </p>
              <p>
                We partner with organizations to identify critical resource gaps, deploy expert Dynamics and niche technical candidates, and cultivate productive workplace environments. Together, we lay down the human foundations necessary to accelerate your growth and achieve long-term commercial goals.
              </p>
            </div>
            
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-sm shadow-xs transition-all duration-200 cursor-pointer"
              >
                Let's Build Your Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Glowing Ambient Backdrop */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-200/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-indigo-200/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              
              <img
                src={peopleGrowthImg}
                alt="Growth Starts with Great People"
                className="relative z-10 w-full h-auto object-cover rounded-2xl shadow-2xl border border-slate-100"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
