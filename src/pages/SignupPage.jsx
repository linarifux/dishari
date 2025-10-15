import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- Icon Components ---
const Icon = ({ name, ...props }) => {
  const icons = {
    Google: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.35 12.14c.08-.73.15-1.46.15-2.14 0-1.92-.3-3.83-.86-5.71h-2.26v3.42h3.12z"/><path d="M12 22c5.52 0 10-4.48 10-10h-3.12c-.56 1.88-1.74 3.5-3.29 4.68l-1.59 1.32z"/><path d="M3.86 8.29A9.97 9.97 0 0 1 2 12c0 1.92.55 3.72 1.5 5.29l1.59-1.32c-1.03-1.1-1.74-2.5-1.92-4.08z"/><path d="M12 3.5c2.76 0 5.23 1.12 7.07 2.93l-2.26 2.26C15.53 7.41 13.88 6.5 12 6.5c-1.88 0-3.53.91-4.68 2.26L5.73 7.41C7.65 5.25 9.88 4 12 4z"/></svg>,
    Facebook: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    User: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    Mail: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    Lock: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  };
  const LucideIcon = icons[name];
  return LucideIcon ? LucideIcon(props) : null;
};

const SignUpPage = () => {
    const handleSignUp = (e) => {
        e.preventDefault();
        // Handle sign-up logic here
        console.log("Signing up...");
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Image and Quote */}
            <div className="hidden lg:block relative">
                <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop" alt="Mountain landscape at night" className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/60"></div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute bottom-10 left-10 p-4"
                >
                    <p className="text-3xl font-bold max-w-md leading-snug">"The journey of a thousand miles begins with a single step."</p>
                    <p className="text-lg text-slate-300 mt-2">- Lao Tzu</p>
                </motion.div>
            </div>

            {/* Right Column - Sign-Up Form */}
            <div className="flex items-center justify-center p-8">
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    <h1 className="text-4xl font-bold mb-2">Create Your Account</h1>
                    <p className="text-slate-400 mb-8">Join the Dishari community and start your adventure.</p>

                    <form onSubmit={handleSignUp} className="space-y-6">
                        <div className="relative">
                            <Icon name="User" className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="Full Name" name='full-name' className="form-input custom-form-input" required />
                        </div>
                        <div className="relative">
                            <Icon name="Mail" className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="email" placeholder="Email Address" name='email' className="form-input custom-form-input" required />
                        </div>
                        <div className="relative">
                            <Icon name="Lock" className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="password" placeholder="Password" name='password' className="form-input custom-form-input" required />
                        </div>

                        <div className="flex items-start">
                            <input id="terms" type="checkbox" className="h-4 w-4 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" required />
                            <label htmlFor="terms" className="ml-3 text-sm text-slate-400">
                                I agree to the <a href="#" className="font-medium text-indigo-400 hover:underline">Terms and Conditions</a>
                            </label>
                        </div>

                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg text-lg">
                            Create Account
                        </motion.button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-slate-950 px-2 text-slate-400">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <motion.button whileHover={{ scale: 1.05 }} className="social-btn">
                            <Icon name="Google" /> Google
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} className="social-btn">
                            <Icon name="Facebook" /> Facebook
                        </motion.button>
                    </div>

                    <p className="text-center text-slate-400 mt-8">
                        Already have an account? <Link to="#" className="font-medium text-indigo-400 hover:underline">Log in</Link>
                    </p>
                </motion.div>
            </div>
             <style>{`
                .form-input { width: 100%; background-color: rgb(30 41 59 / 0.8); border: 1px solid rgb(51 65 85); border-radius: 0.5rem; padding: 0.75rem 1rem; color: white; transition: all 0.2s; }
                .form-input:focus { outline: none; box-shadow: 0 0 0 2px rgb(99 102 241); border-color: rgb(99 102 241); }
                .social-btn { display: flex; align-items: center; justify-content: center; gap: 0.75rem; width: 100%; background-color: rgb(30 41 59 / 0.8); border: 1px solid rgb(51 65 85); padding: 0.75rem; border-radius: 0.5rem; font-weight: 600; transition: background-color 0.2s; }
                .social-btn:hover { background-color: rgb(51 65 85 / 0.8); }
             `}</style>
        </main>
    );
};

export default SignUpPage;