import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Career from './components/Career';
import Contact from './components/Contact';
import Growth from './components/Growth';
import Leadership from './components/Leadership';
import About from './components/About';
import Legal from './components/Legal';
import AdminDashboard from './components/AdminDashboard';

// Helper component to handle smooth scrolling to section hashes
function ScrollToHashElement() {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (hash) {
      const isSamePage = prevPathname.current === pathname;
      const delay = isSamePage ? 50 : 350; // Scroll almost instantly if on same page; wait for page transition if different page
      
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          const yOffset = -90; // Height of the sticky navbar (80px) + 10px spacing
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      }, delay);
      
      prevPathname.current = pathname;
      return () => clearTimeout(timer);
    } else {
      // Instantly scroll to top when changing paths without hash
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      prevPathname.current = pathname;
    }
  }, [pathname, hash]);

  return null;
}

// Animated wrapper for page routes to ensure consistent Framer Motion transitions
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Home page containing Hero, Services, Team, and FAQ
function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Growth />
      <Leadership />
      <Team />
      <FAQ />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        {/* Pages are wrapped in a div with pt-20 to clear the height of the sticky navbar */}
        <Route
          path="/career"
          element={
            <div className="pt-20">
              <PageWrapper>
                <Career />
              </PageWrapper>
            </div>
          }
        />
        <Route
          path="/services"
          element={
            <div className="pt-20">
              <PageWrapper>
                <Services />
              </PageWrapper>
            </div>
          }
        />
        <Route
          path="/team"
          element={
            <div className="pt-20">
              <PageWrapper>
                <Team />
              </PageWrapper>
            </div>
          }
        />
        <Route
          path="/faq"
          element={
            <div className="pt-20">
              <PageWrapper>
                <FAQ />
              </PageWrapper>
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="pt-20">
              <PageWrapper>
                <About />
              </PageWrapper>
            </div>
          }
        />
        <Route
          path="/privacy"
          element={
            <div className="pt-20">
              <PageWrapper>
                <Legal />
              </PageWrapper>
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div className="pt-20">
              <PageWrapper>
                <Contact />
              </PageWrapper>
            </div>
          }
        />
        <Route
          path="/adminpdt"
          element={
            <div className="pt-20">
              <PageWrapper>
                <AdminDashboard />
              </PageWrapper>
            </div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg border border-slate-850 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToHashElement />
      <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans relative">
        {/* Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>

        {/* Footer */}
        <Footer />

        {/* Scroll To Top Button */}
        <ScrollToTop />
      </div>
    </Router>
  );
}
