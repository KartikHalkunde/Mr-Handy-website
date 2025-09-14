'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { motion, AnimatePresence, MotionConfig, type Transition } from 'framer-motion';
import { useRouter } from 'next/navigation';

const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25
};

export default function AuthPage() {
  const [mounted, setMounted] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignUp) {
      try {
        const res = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (res?.error) {
          console.error('Authentication failed:', res.error);
          // Handle error (show message to user)
        } else {
          // Redirect or update UI
          router.refresh();
        }
      } catch (error) {
        console.error('Sign-in error:', error);
        // Handle error (show message to user)
      }
    } else {
      // Handle sign up logic here
      console.log('Sign up with:', formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'firstName' || name === 'lastName') {
      const firstName = name === 'firstName' ? value : formData.name.split(' ')[0] || '';
      const lastName = name === 'lastName' ? value : formData.name.split(' ').slice(1).join(' ');
      setFormData(prev => ({
        ...prev,
        name: `${firstName} ${lastName}`.trim()
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,0,0,0))]"></div>
        
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          style={{ objectFit: 'fill', minHeight: '100vh' }}
        >
          <source src="/auth-background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Auth Form */}
      <MotionConfig transition={springTransition}>
        <div className="relative z-10 w-full max-w-md mx-4">
          <motion.div
            layout
            className="backdrop-blur-2xl bg-black/40 p-8 rounded-[32px] shadow-2xl border border-white/10"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {/* Toggle Buttons */}
            <div className="flex p-1 mb-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 relative">
              <motion.div
                className="absolute inset-1 bg-white/10 rounded-xl backdrop-blur-xl"
                initial={false}
                animate={{
                  x: !isSignUp ? "0%" : "100%",
                  width: "50%"
                }}
                transition={springTransition}
              />
              <motion.button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-3 rounded-xl text-base font-medium z-10 relative ${
                  !isSignUp ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
              <motion.button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-3 rounded-xl text-base font-medium z-10 relative ${
                  isSignUp ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </div>

                          <h2 className="text-2xl font-semibold text-white mb-6">
              {!isSignUp ? 'Welcome back' : 'Create an account'}
            </h2>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.form
                key={!isSignUp ? 'signin' : 'signup'}
                className="space-y-4"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: !isSignUp ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: !isSignUp ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                {isSignUp && (
                  <motion.div 
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex-1">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.name.split(' ')[0] || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                        required={isSignUp}
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.name.split(' ').slice(1).join(' ') || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                        required={isSignUp}
                      />
                    </div>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                    required
                  />
                </motion.div>
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                      required={isSignUp}
                    />
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full relative group mt-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <div className="relative px-6 py-3.5 bg-white/10 rounded-2xl leading-none flex items-center justify-center backdrop-blur-xl border border-white/10">
                    <span className="text-white text-base font-medium">
                      {!isSignUp ? 'Sign In' : 'Create Account'}
                    </span>
                  </div>
                </motion.button>
                
                {/* Terms of Service */}
                <motion.p 
                  className="text-white/40 text-sm text-center mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  By {!isSignUp ? 'signing in' : 'creating an account'}, you agree to our{' '}
                  <a href="/terms" className="text-white hover:underline">Terms of Service</a>
                </motion.p>
              </motion.form>
            </AnimatePresence>
          </motion.div>
        </div>
      </MotionConfig>
    </div>
  );
}
