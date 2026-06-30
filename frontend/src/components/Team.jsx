import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LinkedinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const teamMembers = [
  {
    id: 1,
    name: "Name",
    designation: "Designation",
    avatarColor: "bg-blue-100 text-blue-700",
    initials: "EV",
    email: "eleanor.vance@prodynamicstechnologies.com",
    linkedin: "#"
  },
  {
    id: 2,
    name: "Name",
    designation: "Designation",
    avatarColor: "bg-slate-100 text-slate-700",
    initials: "MS",
    email: "marcus.sterling@prodynamics.com",
    linkedin: "#"
  },
  {
    id: 3,
    name: "Name",
    designation: "Designation",
    avatarColor: "bg-emerald-100 text-emerald-700",
    initials: "AT",
    email: "aria.thorne@prodynamics.com",
    linkedin: "#"
  }
];

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const containerRef = useRef(null);

  // Responsive logic to handle visible cards count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2); // Tablet
      } else {
        setVisibleCards(3); // Desktop
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, teamMembers.length - visibleCards);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section id="team" className="py-24 bg-slate-50 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase">Our Specialists</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Meet Our Leadership Team
          </h2>
          <p className="mt-4 text-slate-500 text-base">
           We help organizations build high-performing teams through innovative workforce strategies designed for long-term success.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative px-4 sm:px-8" ref={containerRef}>
          
          {/* Card Viewport Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: `-${currentIndex * (100 / visibleCards)}%`
              }}
              transition={{
                type: "tween",
                ease: [0.22, 1, 0.36, 1],
                duration: 1.4
              }}
            >
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="px-3 shrink-0"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <div className="bg-white border border-slate-100 rounded-sm p-6 shadow-xs hover:shadow-md transition-shadow">
                    {/* Profile Image Area */}
                    <div className="relative mb-6">
                      <div className={`w-full aspect-square flex items-center justify-center text-4xl font-bold rounded-sm ${member.avatarColor}`}>
                        {member.initials}
                      </div>
                      <div className="absolute inset-0 border border-slate-200/50 rounded-sm pointer-events-none"></div>
                    </div>

                    {/* Identity Details */}
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-sm font-medium text-blue-600 mt-1 mb-4">
                        {member.designation}
                      </p>

                      {/* Contact and LinkedIn Icons */}
                      <div className="flex space-x-3 pt-3 border-t border-slate-100">
                        <a
                          href={member.linkedin}
                          className="p-1.5 text-slate-400 hover:text-slate-900 rounded-sm hover:bg-slate-50 transition-colors"
                          title="LinkedIn"
                        >
                          <LinkedinIcon className="h-4.5 w-4.5" />
                        </a>
                        <a
                          href={`mailto:${member.email}`}
                          className="p-1.5 text-slate-400 hover:text-slate-900 rounded-sm hover:bg-slate-50 transition-colors"
                          title="Email Contact"
                        >
                          <Mail className="h-4.5 w-4.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons centered vertically in the middle of card row */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 p-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-full shadow-md transition-all cursor-pointer z-20 flex items-center justify-center"
              aria-label="Previous Team Members"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 p-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-full shadow-md transition-all cursor-pointer z-20 flex items-center justify-center"
              aria-label="Next Team Members"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

        </div>

      </div>
    </section>
  );
}
