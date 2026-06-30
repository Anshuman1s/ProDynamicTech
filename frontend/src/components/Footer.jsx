import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const TwitterIcon = (props) => (
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
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const FacebookIcon = (props) => (
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
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 border-t border-slate-200 overflow-hidden pt-16 pb-20 md:pb-28 lg:pb-36">
      
      {/* Main Footer Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-8">
          
          {/* Brand/Description Column */}
          <div className="md:col-span-4 text-left">
            <img
              src="/logo.png"
              alt="ProDynamics Logo"
              className="h-10 w-auto mb-6 object-contain"
            />
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              ProDynamics HR Services is a premium human resources advisory and recruitment agency dedicated to building high-performing teams and scalable organizational structures.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="p-2 bg-white border border-slate-200 hover:border-slate-400 text-slate-400 hover:text-slate-900 rounded-sm transition-colors cursor-pointer" aria-label="LinkedIn">
                <LinkedinIcon className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 hover:border-slate-400 text-slate-400 hover:text-slate-900 rounded-sm transition-colors cursor-pointer" aria-label="Twitter">
                <TwitterIcon className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 hover:border-slate-400 text-slate-400 hover:text-slate-900 rounded-sm transition-colors cursor-pointer" aria-label="Facebook">
                <FacebookIcon className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Offering', 'Team', 'Career', 'FAQ'].map((item) => {
                let toPath = '/';
                if (item === 'Offering') toPath = '/services';
                else if (item === 'About Us') toPath = '/about';
                else if (item === 'Team') toPath = '/team';
                else if (item === 'Career') toPath = '/career';
                else if (item === 'FAQ') toPath = '/faq';

                return (
                  <li key={item}>
                    <Link
                      to={toPath}
                      className="text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors"
                    >
                      {item === 'Offering' ? 'Services' : item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Core Services Column */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">Services</h4>
            <ul className="space-y-4">
              {[
                'Strategic Hiring & Search',
                'HR Audit & Risk Consulting',
                'Performance Benchmarking',
                'Employee Growth Pathing',
                'Payroll & Benefits Setup'
              ].map((service) => (
                <li key={service} className="text-sm text-slate-500 font-medium">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">Address</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Indore,<br />
                  Madhya Pradesh 
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-slate-400 shrink-0" />
                <span>987654321</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-slate-400 shrink-0" />
                <span>info@prodynamicstechnologies.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Simple Divider Line */}
        <div className="border-t border-slate-200/60 my-6"></div>

        {/* Copyright & Legal Links Strip (Placed before wave) */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 py-4">
          <p>© {currentYear} ProDynamics. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link to="/privacy" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Elegant Curved SVG Wave Divider at the Very Bottom of Footer */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg className="relative block w-full h-[60px] md:h-[100px] lg:h-[140px]" viewBox="0 0 1440 200" preserveAspectRatio="none">
          {/* Layer 1 (Darker Blue wave background) */}
          <path 
            d="M0,120 C320,50 640,180 960,110 C1120,75 1280,110 1440,130 L1440,200 L0,200 Z" 
            fill="rgba(59, 130, 246, 0.08)" 
          />
          {/* Layer 2 (Lighter Blue/Indigo wave middle) */}
          <path 
            d="M0,150 C400,90 800,210 1120,140 C1280,110 1360,160 1440,165 L1440,200 L0,200 Z" 
            fill="rgba(99, 102, 241, 0.12)" 
          />
          {/* Layer 3 (Solid White foreground wave - transitions into bottom page boundary) */}
          <path 
            d="M0,180 C480,130 960,230 1440,170 L1440,200 L0,200 Z" 
            fill="#ffffff" 
          />
        </svg>
      </div>

    </footer>
  );
}
