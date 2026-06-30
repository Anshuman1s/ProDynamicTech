import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle sticky border shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Career', href: '/career' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs'
          : 'bg-white/80 backdrop-blur-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                className="h-15 w-auto object-contain"
                src="/logo.png"
                alt="ProDynamics Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-slate-600 hover:text-slate-900 font-bold text-sm transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-sm transition-all duration-200 shadow-xs cursor-pointer"
            >
              Contact
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden cursor-pointer"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b border-slate-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-sm text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 pb-2 px-3">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-sm transition-all shadow-xs"
            >
              Contact
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
