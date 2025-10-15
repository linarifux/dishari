import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { motion, AnimatePresence } from 'framer-motion';

// --- Helper Components ---

const Icon = ({ name, ...props }) => {
  const icons = {
    Mountain: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>,
    Menu: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
    X: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    User: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    LogOut: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  };
  const LucideIcon = icons[name];
  return LucideIcon ? LucideIcon(props) : null;
};

const Button = ({ children, className = '', ...props }) => (
    <button 
        className={`bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 transform hover:-translate-y-0.5 ${className}`}
        {...props}
    >
        {children}
    </button>
);

// --- Login Modal Component ---
const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            onLogin();
            onClose();
        }, 500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-slate-800/80 backdrop-blur-lg w-full max-w-md rounded-2xl shadow-2xl p-8 relative"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                            <Icon name="X" size={24} />
                        </button>
                        <h2 className="text-3xl font-bold text-white text-center mb-6">Login to Dishari</h2>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-slate-300 mb-2">Email Address</label>
                                <input type="email" placeholder="you@example.com" className="form-input" required />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-2">Password</label>
                                <input type="password" placeholder="••••••••" className="form-input" required />
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <a href="#" className="text-indigo-400 hover:underline">Forgot Password?</a>
                            </div>
                            <Button type="submit" className="w-full !py-3 text-lg">Login</Button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- Main Navbar Component ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const navLinks = [
    { title: 'Home', to: '/' },
    { title: 'About', to: '/about' },
    { title: 'Gallery', to: '/gallery' },
    { title: 'Packages', to: '/packages' },
    { title: 'Contact', to: '/contact' },
  ];

  const handleLogout = () => setIsLoggedIn(false);
  const handleLogin = () => setIsLoggedIn(true);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 p-2 sm:p-4 font-sans" // z-40 to be below modal
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex justify-between items-center h-16 glass-nav rounded-2xl px-4 sm:px-6">
            <Link to="/" className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-white">
              <Icon name="Mountain" className="text-indigo-400" />
              <span>Dishari</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink key={link.title} to={link.to} className={({ isActive }) => `text-gray-300 hover:text-white transition-colors duration-300 ${isActive ? 'text-white font-semibold' : ''}`}>
                  {link.title}
                </NavLink>
              ))}
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <img src="https://i.pravatar.cc/40?img=3" alt="User" className="w-8 h-8 rounded-full border-2 border-indigo-400"/>
                      <span className="text-white font-medium">Alex</span>
                    </div>
                    <button onClick={handleLogout} className="text-slate-300 hover:text-white transition-colors"><Icon name="LogOut"/></button>
                </div>
              ) : (
                <>
                  <button onClick={() => setIsLoginOpen(true)} className="text-gray-300 hover:text-white font-semibold transition-colors">Login</button>
                  <Link to="/signup"><Button>Sign Up</Button></Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                <Icon name={isOpen ? "X" : "Menu"} size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="lg:hidden mt-2 glass-nav rounded-2xl p-6">
              <div className="flex flex-col items-center space-y-4">
                {navLinks.map((link) => <NavLink key={link.title} to={link.to} onClick={() => setIsOpen(false)} className={({ isActive }) => `text-gray-300 hover:text-white transition-colors duration-300 block w-full text-center py-2 text-lg ${isActive ? 'text-white font-semibold' : ''}`}>{link.title}</NavLink>)}
                <div className="pt-4 mt-4 border-t border-slate-700/50 w-full flex flex-col items-center gap-4">
                  {isLoggedIn ? ( <div className="flex items-center gap-4"><img src="https://i.pravatar.cc/40?img=3" alt="User" className="w-10 h-10 rounded-full border-2 border-indigo-400"/><span className="text-white font-medium text-lg">Alex</span><button onClick={()=>{handleLogout(); setIsOpen(false);}} className="text-slate-300 hover:text-white transition-colors"><Icon name="LogOut" size={28}/></button></div> ) : ( <> <button onClick={() => { setIsLoginOpen(true); setIsOpen(false); }} className="text-gray-300 hover:text-white font-semibold transition-colors w-full py-2 text-lg">Login</button><NavLink to="/signup"><Button className="w-full text-lg">Sign Up</Button></NavLink></> )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Login Modal Render */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />

      {/* Global styles for components */}
      <style>{`
        .glass-nav { background: rgba(22, 30, 46, 0.7); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .form-input { width: 100%; background-color: rgb(30 41 59 / 0.8); border: 1px solid rgb(51 65 85); border-radius: 0.5rem; padding: 0.75rem 1rem; color: white; transition: all 0.2s; }
        .form-input:focus { outline: none; box-shadow: 0 0 0 2px rgb(99 102 241); border-color: rgb(99 102 241); }
      `}</style>
    </>
  );
};

export default Navbar;