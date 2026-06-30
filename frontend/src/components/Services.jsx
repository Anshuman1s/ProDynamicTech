import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamicsStaffingImg from '../assets/dynamics_staffing.jpg';
import nicheHiringImg from '../assets/niche_hiring.jpg';
import aiInHrImg from '../assets/ai_in_hr.jpg';

// Scalable array containing the services data.
const services = [
  {
    id: 1,
    title: "Dynamics Staffing",
    image: dynamicsStaffingImg,
    description: "We specialize in hiring across the entire Microsoft Dynamics ecosystem, including Dynamics 365 CRM, Finance & Operations (F&O), NAV, Business Central, and other Dynamics technologies. We also have experienced bench resources available for immediate deployment across these technologies. Whether you need permanent hires, contract staffing, or project-based resources, we are ready to help you build a future-ready workforce for your Microsoft Dynamics initiatives.",
  },
  {
    id: 2,
    title: "Niche Technology Hiring",
    image: nicheHiringImg,
    description: "We have strong expertise in niche technology hiring, supported by a team of experienced recruiters who specialize in identifying and delivering high-quality talent for hard-to-fill technical positions. We are committed to quality hiring and focus on providing the right talent that aligns with our clients’ technical requirements and business goals.",
  },
  {
    id: 3,
    title: "AI in Human Resources",
    image: aiInHrImg,
    description: "Our recruitment team leverages Artificial Intelligence (AI) to deliver faster, more efficient, and high-quality hiring outcomes. Our recruiters are trained to use AI tools in their day-to-day recruitment activities, enabling them to streamline sourcing, screening, candidate engagement, and overall hiring processes. In addition, we provide AI training for HR professionals, helping organizations adopt AI-powered recruitment practices and improve productivity, efficiency, and decision-making.",
  }
];

export default function Services() {
  return (
    <section id="offering" className="py-24 bg-white">
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
            <Sparkles className="h-4 w-4" />
            <span>Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Transforming Workforce Management with Modern Solutions
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            We deliver robust strategies across the entire employee lifecycle to help you retain talent, ensure compliance, and boost operational efficiency.
          </p>
        </motion.div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative bg-white border border-slate-100 rounded-xl hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Box Type Image Header at Top of Card */}
                <div className="relative w-full aspect-video overflow-hidden bg-slate-50 border-b border-slate-100">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>

                {/* Text Details */}
                <div className="p-6 pb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
