'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence, MotionConfig, type Transition } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { SuccessPopup } from '@/components/SuccessPopup';
import { validateLoginForm, validateSignupForm } from '@/lib/validation';

const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25
};

function AuthPageContent() {
  const [mounted, setMounted] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('/dashboard');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Get redirect URL from query params
  useEffect(() => {
    const callbackUrl = searchParams.get('callbackUrl');
    if (callbackUrl) {
      setRedirectUrl(callbackUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setErrors({});

    try {
      if (!isSignUp) {
        // Login
        const validation = validateLoginForm({ email: formData.email, password: formData.password });
        
        if (!validation.isValid) {
          const errorMap: {[key: string]: string} = {};
          validation.errors.forEach(error => {
            errorMap[error.field] = error.message;
          });
          setErrors(errorMap);
          return;
        }

        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setShowSuccessPopup(true);
        } else {
          if (data.errors) {
            const errorMap: {[key: string]: string} = {};
            data.errors.forEach((error: { field: string; message: string }) => {
              errorMap[error.field] = error.message;
            });
            setErrors(errorMap);
          } else {
            setErrors({ general: data.message });
          }
        }
      } else {
        // Signup
        const validation = validateSignupForm(formData);
        
        if (!validation.isValid) {
          const errorMap: {[key: string]: string} = {};
          validation.errors.forEach(error => {
            errorMap[error.field] = error.message;
          });
          setErrors(errorMap);
          return;
        }

        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          setShowSuccessPopup(true);
        } else {
          if (data.errors) {
            const errorMap: {[key: string]: string} = {};
            data.errors.forEach((error: { field: string; message: string }) => {
              errorMap[error.field] = error.message;
            });
            setErrors(errorMap);
          } else {
            setErrors({ general: data.message });
          }
        }
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    router.push(redirectUrl);
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
    <div className="min-h-screen relative flex items-center justify-center" style={{ minHeight: '120vh' }}>
      {/* Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ minHeight: '100vh' }}
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

            {/* Error Display */}
            <AnimatePresence>
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4"
                >
                  {errors.general}
                </motion.div>
              )}
            </AnimatePresence>

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
                    className={`w-full px-4 py-3.5 rounded-2xl bg-white/5 border text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:bg-white/10 transition-all ${
                      errors.email ? 'border-red-500' : 'border-white/10 focus:ring-white/20'
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 pr-12 rounded-2xl bg-white/5 border text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:bg-white/10 transition-all ${
                        errors.password ? 'border-red-500' : 'border-white/10 focus:ring-white/20'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                  )}
                </motion.div>
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 pr-12 rounded-2xl bg-white/5 border text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:bg-white/10 transition-all ${
                          errors.confirmPassword ? 'border-red-500' : 'border-white/10 focus:ring-white/20'
                        }`}
                        required={isSignUp}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full relative group mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <div className="relative px-6 py-3.5 bg-white/10 rounded-2xl leading-none flex items-center justify-center backdrop-blur-xl border border-white/10">
                    <span className="text-white text-base font-medium">
                      {loading ? 'Please wait...' : (!isSignUp ? 'Sign In' : 'Create Account')}
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
      
      {/* Success Popup */}
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={handleSuccessPopupClose}
        message={!isSignUp ? "You've signed in successfully!" : "Account created successfully! You're now signed in."}
      />
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
}
