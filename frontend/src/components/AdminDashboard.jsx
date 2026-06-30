import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  LogOut, 
  Inbox, 
  Briefcase, 
  Users, 
  Clock, 
  Database, 
  Calendar, 
  Download, 
  FileText,
  Search,
  CheckCircle,
  AlertCircle,
  RotateCw
} from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Dashboard states
  const [submissions, setSubmissions] = useState({ contacts: [], careers: [] });
  const [activeTab, setActiveTab] = useState('careers'); // 'careers' or 'contacts'
  const [dashLoading, setDashLoading] = useState(false);
  const [dashError, setDashError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Check authentication on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('pdt_admin_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setAdminUser(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('pdt_admin_user');
      }
    }
  }, []);

  // Fetch submissions when authenticated
  useEffect(() => {
    if (isAuthenticated && adminUser) {
      fetchSubmissions();
    }
  }, [isAuthenticated, adminUser]);

  const fetchSubmissions = async () => {
    setDashLoading(true);
    setDashError('');
    try {
      const response = await fetch('http://localhost:5000/api/admin/submissions', {
        headers: {
          'x-admin-email': adminUser.email,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSubmissions({
          contacts: data.contacts || [],
          careers: data.careers || [],
        });
      } else {
        setDashError(data.error || 'Failed to fetch submissions.');
      }
    } catch (err) {
      console.error(err);
      setDashError('Network error connecting to backend API.');
    } finally {
      setDashLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setLoginError('');

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const userObj = { email: data.user.email };
        localStorage.setItem('pdt_admin_user', JSON.stringify(userObj));
        setAdminUser(userObj);
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || 'Invalid credentials or login failed.');
      }
    } catch (err) {
      console.error(err);
      setLoginError('Could not connect to the backend server. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('pdt_admin_user');
    setAdminUser(null);
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  // Filter submissions by search query
  const filteredCareers = submissions.careers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.phone && c.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (c.message && c.message.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredContacts = submissions.contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.phone && c.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
    c.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Formats date string cleanly
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Login Card View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
        {/* Glow Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-sm filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-sm filter blur-3xl opacity-50"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md z-10"
        >
          {/* Logo Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Admin Login 
            </h2>
            <p className="mt-2 text-slate-500 text-sm">
              Please enter your credentials to access the submissions dashboard.
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white border border-slate-200 p-8 rounded-sm shadow-xl relative">
            <div className="absolute top-0 right-0 p-3">
              <Database className="h-5 w-5 text-slate-300" />
            </div>

            {loginError && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm flex items-start space-x-3 text-red-800 text-sm"
              >
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="flex flex-col text-left">
                <label htmlFor="admin-email" className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Admin Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    id="admin-email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-slate-900 focus:outline-hidden rounded-sm transition-colors text-slate-850 placeholder-slate-400 text-base"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col text-left">
                <label htmlFor="admin-password" className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Secure Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="admin-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 focus:border-slate-900 focus:outline-hidden rounded-sm transition-colors text-slate-850 placeholder-slate-400 text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center py-3.5 px-4 text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-sm shadow-md transition-all duration-150 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? 'Authenticating...' : 'Sign In as Admin'}
              </button>
            </form>
          </div>
          
          <div className="mt-8 text-center text-slate-400 text-xs">
            ProDynamics Security Advisory • Authorized Personnel Only
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* Premium Dashboard Header */}
      <header className="bg-slate-900 text-white shadow-md relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-sm filter blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-sm text-xs font-semibold uppercase tracking-wider mb-2">
              {/* <Database className="h-3 w-3" /> */}
              <span>Secure Dashboard</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">
              Logged in as <span className="text-slate-200 font-medium">{adminUser.email}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Auto Delete Warning Indicator */}
            <div className="inline-flex items-center space-x-2 px-4 py-2  text-cyan-300 rounded-sm text-xs">
              <Clock className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>TTL active: data auto-deleted after 7 days</span>
            </div>
            
            <button
              onClick={fetchSubmissions}
              disabled={dashLoading}
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-full transition-all duration-150 flex items-center justify-center cursor-pointer disabled:opacity-50"
              aria-label="Refresh Data"
              title="Refresh Data"
            >
              <RotateCw className={`h-4 w-4 ${dashLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded text-sm font-semibold shadow-md shadow-red-900/10 transition-all duration-150 flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          
          {/* Card: Careers applications */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-5 text-left">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-sm">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Job Applications</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{submissions.careers.length}</h3>
              <p className="text-slate-500 text-xs mt-0.5">Resumes received</p>
            </div>
          </div>

          {/* Card: Contacts inquiries */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-5 text-left">
            <div className="p-4 bg-teal-50 text-teal-600 rounded-xl">
              <Inbox className="h-6 w-6" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Contact Inquiries</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{submissions.contacts.length}</h3>
              <p className="text-slate-500 text-xs mt-0.5">Inbound messages</p>
            </div>
          </div>

          {/* Card: Total */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-5 text-left">
            <div className="p-4 bg-purple-50 text-cyan-600 rounded-sm">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Submissions</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                {submissions.careers.length + submissions.contacts.length}
              </h3>
              {/* <p className="text-slate-500 text-xs mt-0.5">Stored in database</p> */}
            </div>
          </div>

        </div>

        {dashError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded flex items-start space-x-3 text-sm text-left">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5">Retrieval Error</span>
              <span>{dashError}</span>
            </div>
          </div>
        )}

        {/* Dashboard Grid Container */}
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          
          {/* Controls Bar: Tabs and Search */}
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-slate-50/50">
            
            {/* Tabs */}
            <div className="flex bg-slate-200/60 p-1 rounded self-start">
              <button
                onClick={() => { setActiveTab('careers'); setSearchQuery(''); }}
                className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'careers' 
                    ? 'bg-white text-blue-600 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Resumes & Careers ({filteredCareers.length})
              </button>
              <button
                onClick={() => { setActiveTab('contacts'); setSearchQuery(''); }}
                className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'contacts' 
                    ? 'bg-white text-teal-600 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Inquiries & Contacts ({filteredContacts.length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative max-w-sm w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search by name, email, message...`}
                className="w-full pl-9 pr-4 py-2 border  border-slate-200 focus:border-slate-900 focus:outline-hidden rounded text-sm bg-white"
              />
            </div>

          </div>

          {/* List Area */}
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Careers/Resumes */}
              {activeTab === 'careers' && (
                <motion.div
                  key="careers-tab"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="divide-y divide-slate-100"
                >
                  {dashLoading ? (
                    <div className="py-20 text-slate-400 text-sm flex justify-center items-center">Loading applications...</div>
                  ) : filteredCareers.length === 0 ? (
                    <div className="py-20 text-slate-400 text-sm text-center">
                      {searchQuery ? 'No matching job applications found.' : 'No job applications submitted in the last 7 days.'}
                    </div>
                  ) : (
                    filteredCareers.map((item) => (
                      <div key={item._id} className="p-6 hover:bg-slate-50/40 transition-colors flex flex-col md:flex-row md:items-start gap-6 text-left">
                        {/* File icon / Avatar info */}
                        <div className="h-12 w-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl shrink-0">
                          <FileText className="h-6 w-6" />
                        </div>

                        {/* Main submission info */}
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h4 className="text-base font-bold text-slate-800">{item.name}</h4>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-0.5">
                                <a href={`mailto:${item.email}`} className="text-sm font-medium text-blue-600 hover:underline">
                                  {item.email}
                                </a>
                                {item.phone && (
                                  <>
                                    <span className="hidden sm:inline text-slate-300">|</span>
                                    <a href={`tel:${item.phone}`} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                                      {item.phone}
                                    </a>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1.5 text-slate-400 text-xs font-medium">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{formatDate(item.createdAt)}</span>
                            </div>
                          </div>

                          {/* Message box */}
                          <div className="mt-4 bg-slate-50 border border-slate-100 p-4 rounded-lg text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                            {item.message || <span className="text-slate-400 italic">No additional message provided.</span>}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="shrink-0 flex md:flex-col items-stretch gap-2 mt-4 md:mt-0 justify-end">
                          <a
                            href={item.resumePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Download Resume</span>
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {/* Tab 2: Contacts/Inquiries */}
              {activeTab === 'contacts' && (
                <motion.div
                  key="contacts-tab"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="divide-y divide-slate-100"
                >
                  {dashLoading ? (
                    <div className="py-20 text-slate-400 text-sm">Loading inquiries...</div>
                  ) : filteredContacts.length === 0 ? (
                    <div className="py-20 text-slate-400 text-sm text-center">
                      {searchQuery ? 'No matching inquiries found.' : 'No contact inquiries submitted in the last 7 days.'}
                    </div>
                  ) : (
                    filteredContacts.map((item) => (
                      <div key={item._id} className="p-6 hover:bg-slate-50/40 transition-colors flex flex-col md:flex-row md:items-start gap-6 text-left">
                        {/* Inbox icon */}
                        <div className="h-12 w-12 flex items-center justify-center bg-teal-50 text-teal-600 rounded-xl shrink-0">
                          <Inbox className="h-6 w-6" />
                        </div>

                        {/* Main info */}
                        <div className="flex-grow w-full">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h4 className="text-base font-bold text-slate-800">{item.name}</h4>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-0.5">
                                <a href={`mailto:${item.email}`} className="text-sm font-medium text-teal-600 hover:underline">
                                  {item.email}
                                </a>
                                {item.phone && (
                                  <>
                                    <span className="hidden sm:inline text-slate-300">|</span>
                                    <a href={`tel:${item.phone}`} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                                      {item.phone}
                                    </a>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1.5 text-slate-400 text-xs font-medium">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{formatDate(item.createdAt)}</span>
                            </div>
                          </div>

                          {/* Message box */}
                          <div className="mt-4 bg-slate-50 border border-slate-100 p-4 rounded-lg text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                            {item.message}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </main>

    </div>
  );
}
