import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero_composite.png';

// Configuration for flowing/floating dot particles in the background
const particles = [
  { id: 1, size: 'w-2 h-2', top: '10%', left: '5%', delay: 0, duration: 8, opacity: 0.15 },
  { id: 2, size: 'w-3 h-3', top: '22%', left: '42%', delay: 1, duration: 10, opacity: 0.1 },
  { id: 3, size: 'w-1.5 h-1.5', top: '65%', left: '15%', delay: 2, duration: 7, opacity: 0.2 },
  { id: 4, size: 'w-2.5 h-2.5', top: '78%', left: '38%', delay: 1.5, duration: 9, opacity: 0.12 },
  { id: 5, size: 'w-3.5 h-3.5', top: '35%', left: '80%', delay: 0.5, duration: 11, opacity: 0.08 },
  { id: 6, size: 'w-2 h-2', top: '68%', left: '90%', delay: 2.5, duration: 8, opacity: 0.15 },
  { id: 7, size: 'w-2.5 h-2.5', top: '50%', left: '8%', delay: 3, duration: 10, opacity: 0.13 },
  { id: 8, size: 'w-1.5 h-1.5', top: '7%', left: '85%', delay: 0.2, duration: 6, opacity: 0.22 },
  { id: 9, size: 'w-2 h-2', top: '45%', left: '28%', delay: 1.2, duration: 7.5, opacity: 0.14 },
  { id: 10, size: 'w-3 h-3', top: '85%', left: '18%', delay: 2.2, duration: 12, opacity: 0.09 },
  { id: 11, size: 'w-1.5 h-1.5', top: '18%', left: '72%', delay: 0.8, duration: 6.5, opacity: 0.18 },
  { id: 12, size: 'w-2.5 h-2.5', top: '55%', left: '75%', delay: 1.8, duration: 9.5, opacity: 0.11 },
  { id: 13, size: 'w-2 h-2', top: '30%', left: '20%', delay: 0.4, duration: 8.5, opacity: 0.16 },
  { id: 14, size: 'w-3.5 h-3.5', top: '90%', left: '65%', delay: 1.6, duration: 11.5, opacity: 0.07 },
  { id: 15, size: 'w-1.5 h-1.5', top: '38%', left: '55%', delay: 2.8, duration: 5.5, opacity: 0.21 },
  { id: 16, size: 'w-2.5 h-2.5', top: '15%', left: '60%', delay: 1.1, duration: 10.5, opacity: 0.1 },
  { id: 17, size: 'w-2 h-2', top: '60%', left: '50%', delay: 0.3, duration: 7.8, opacity: 0.14 },
  { id: 18, size: 'w-3 h-3', top: '5%', left: '30%', delay: 2.5, duration: 13, opacity: 0.08 },
  { id: 19, size: 'w-1.5 h-1.5', top: '72%', left: '3%', delay: 1.4, duration: 6.2, opacity: 0.19 },
  { id: 20, size: 'w-2 h-2', top: '82%', left: '85%', delay: 0.9, duration: 8.2, opacity: 0.15 },
  { id: 21, size: 'w-2 h-2', top: '25%', left: '15%', delay: 1.7, duration: 7.2, opacity: 0.16 },
  { id: 22, size: 'w-1.5 h-1.5', top: '40%', left: '92%', delay: 0.3, duration: 6.8, opacity: 0.23 },
  { id: 23, size: 'w-3 h-3', top: '55%', left: '33%', delay: 2.1, duration: 11, opacity: 0.09 },
  { id: 24, size: 'w-2.5 h-2.5', top: '12%', left: '52%', delay: 1.4, duration: 8.5, opacity: 0.13 },
  { id: 25, size: 'w-1.5 h-1.5', top: '88%', left: '8%', delay: 0.9, duration: 5.8, opacity: 0.24 },
  { id: 26, size: 'w-2 h-2', top: '3%', left: '78%', delay: 2.3, duration: 7.6, opacity: 0.15 },
  { id: 27, size: 'w-3.5 h-3.5', top: '47%', left: '68%', delay: 0.6, duration: 10.8, opacity: 0.08 },
  { id: 28, size: 'w-2 h-2', top: '75%', left: '24%', delay: 1.9, duration: 8.1, opacity: 0.17 },
  { id: 29, size: 'w-1.5 h-1.5', top: '28%', left: '3%', delay: 0.5, duration: 6.4, opacity: 0.22 },
  { id: 30, size: 'w-2.5 h-2.5', top: '63%', left: '40%', delay: 1.3, duration: 9.2, opacity: 0.12 },
  { id: 31, size: 'w-2 h-2', top: '82%', left: '58%', delay: 2.7, duration: 7.9, opacity: 0.14 },
  { id: 32, size: 'w-1.5 h-1.5', top: '92%', left: '30%', delay: 0.2, duration: 5.9, opacity: 0.2 },
  { id: 33, size: 'w-3 h-3', top: '18%', left: '22%', delay: 1.6, duration: 10.2, opacity: 0.11 },
  { id: 34, size: 'w-2.5 h-2.5', top: '50%', left: '85%', delay: 0.8, duration: 8.7, opacity: 0.13 },
  { id: 35, size: 'w-1.5 h-1.5', top: '33%', left: '96%', delay: 2.4, duration: 6.6, opacity: 0.22 },
];

// Flip animations for "Scale Your Growth."
const flipContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.18, // write word by word
    }
  }
};

const flipWordVariants = {
  initial: { 
    opacity: 0, 
    rotateX: -95, // starts flipped back
    y: 12,
  },
  animate: { 
    opacity: 1, 
    rotateX: 0, 
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 90,
    }
  }
};

export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-72 md:pb-[380px] lg:pb-[480px] bg-linear-to-b from-[#0a1128] via-[#101f42] to-[#0d1836] overflow-hidden">
      
      {/* Floating Dot Particles (Stylized as stars) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.size} bg-blue-300 rounded-full pointer-events-none`}
          style={{ top: p.top, left: p.left, opacity: p.opacity * 1.5 }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-900/40 text-blue-300 border border-cyan-800 px-3 py-1 rounded text-xs font-semibold w-fit mb-6">
              <span>Next-Gen HR & Workforce Solutions</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
              Empower Your Team.<br />
              <motion.span
                variants={flipContainerVariants}
                initial="initial"
                animate="animate"
                className="inline-flex flex-wrap mt-2"
                style={{ perspective: 1000 }}
              >
                {["Scale", "Your", "Growth."].map((word, idx) => (
                  <motion.span
                    key={idx}
                    variants={flipWordVariants}
                    className="inline-block text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-300 to-cyan-400 mr-[0.25em] last:mr-0 origin-center"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.span>
            </h1>
            
            <p className="mt-6 text-lg text-blue-100/75 max-w-xl">
              ProDynamics provides customized human resource management, organizational development, and recruitment strategies designed to attract talent and build a resilient workforce.
            </p>
            
            {/* Value Props */}
            <div className="mt-8 space-y-3">
              {[
                'Tailored Talent Acquisition Systems',
                'Performance and Payroll Advisory',
                'Comprehensive Career and Growth Consulting'
              ].map((text, i) => (
                <div key={i} className="flex items-center space-x-2 text-blue-100/90 text-sm font-medium">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Call to Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/career"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-sm shadow-xs transition-all duration-200 cursor-pointer"
              >
                Apply for Positions
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#offering"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20 rounded-sm transition-all duration-200 cursor-pointer"
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Decorative shapes behind image for high aesthetics */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              
              <img
                src={heroImg}
                alt="ProDynamics HR Corporate Banner"
                className="relative z-10 w-full h-auto object-cover rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Elegant Curved SVG Wave Divider at the Bottom (Layered Asymmetrical Wave Design) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg className="relative block w-full h-[220px] md:h-[340px] lg:h-[450px]" viewBox="0 0 1440 200" preserveAspectRatio="none">
          {/* Layer 1 (Darker Blue wave in the background) */}
          <path 
            d="M0,120 C320,50 640,180 960,110 C1120,75 1280,110 1440,130 L1440,200 L0,200 Z" 
            fill="rgba(59, 130, 246, 0.12)" 
          />
          {/* Layer 2 (Lighter Blue/Indigo translucent wave in the middle) */}
          <path 
            d="M0,150 C400,90 800,210 1120,140 C1280,110 1360,160 1440,165 L1440,200 L0,200 Z" 
            fill="rgba(99, 102, 241, 0.2)" 
          />
          {/* Layer 3 (Solid White wave in the foreground - separates the blue section from the next white section) */}
          <path 
            d="M0,180 C480,130 960,230 1440,170 L1440,200 L0,200 Z" 
            fill="#ffffff" 
          />
        </svg>
      </div>

    </section>
  );
}
