import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Cpu, Cloud, Award, Coins, ShieldCheck, Globe, Headphones, ShieldOff, Laptop, Currency, BriefcaseBusiness, Handshake } from 'lucide-react';

const industries = [
  {
    id: 2,
    name: "Technology Hiring (EAS, RIMS, Web)",
    icon: Laptop,
  },
  {
    id: 3,
    name: "Cloud Data AI",
    icon: Cloud,
  },
  {
    id: 5,
    name: "Finance & Accounting (F&A)",
    icon: Currency,
  },
  {
    id: 1,
    name: "Business and Management Consulting / Advisory",
    icon: Handshake,
  },
  {
    id: 4,
    name: "Dedicated expert support",
    icon: Headphones,
  },
  {
    id: 6,
    name: "Enterprise-grade security and privacy",
    icon: ShieldOff,
  }
];

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-1.5 text-blue-600 font-semibold text-xs tracking-wider uppercase mb-3">
            <Globe className="h-4 w-4" />
            <span>Global Footprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Global Reach, Industry Leadership
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Our global reach ensures that we can find the perfect fit for your organization, no matter where you are or what industry you're in. We pride ourselves on our ability to cater to a diverse range of industries, including:
          </p>
        </motion.div>

        {/* 3-Column Grid Layout (3 in a line, 3 in the next line) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12 max-w-5xl mx-auto">
          {industries.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col items-center text-center p-4 transition-all duration-300"
              >
                {/* Large Icon (Flat, No Box) */}
                <div className="text-blue-600 mb-5 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-12 w-12" />
                </div>
                
                {/* Downside Text */}
                <h3 className="text-base font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors duration-300 max-w-xs">
                  {item.name}
                </h3>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
