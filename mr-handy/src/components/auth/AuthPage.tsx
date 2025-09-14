'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthPageProps {
  defaultView?: 'signin' | 'signup';
}

export default function AuthPage({ defaultView = 'signin' }: AuthPageProps) {
  const [isSignIn, setIsSignIn] = useState(defaultView === 'signin');

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
          poster="/mr-handy-logo.png"
        >
          <source src="/auth-bg.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Auth Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-black/30 rounded-3xl p-8 shadow-2xl border border-white/10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <motion.button
                className={`text-lg font-medium px-4 py-2 rounded-full ${
                  isSignIn ? 'text-white' : 'text-gray-400'
                }`}
                onClick={() => setIsSignIn(true)}
                animate={{
                  scale: isSignIn ? 1.05 : 1,
                }}
              >
                Sign In
              </motion.button>
              <motion.button
                className={`text-lg font-medium px-4 py-2 rounded-full ${
                  !isSignIn ? 'text-white' : 'text-gray-400'
                }`}
                onClick={() => setIsSignIn(false)}
                animate={{
                  scale: !isSignIn ? 1.05 : 1,
                }}
              >
                Sign Up
              </motion.button>
            </div>

            {/* Auth Forms */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isSignIn ? 'signin' : 'signup'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-4">
                  {!isSignIn && (
                    <input
                      type="text"
                      placeholder="Full name"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/40"
                    />
                  )}
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                  {!isSignIn && (
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/40"
                    />
                  )}
                </div>

                {/* Apple-style Liquid Button */}
                <button className="mt-6 w-full relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <div className="relative px-6 py-3 bg-black rounded-xl leading-none flex items-center justify-center">
                    <span className="text-gray-100 transition duration-200 group-hover:text-white text-lg font-medium">
                      {isSignIn ? 'Sign In' : 'Create Account'}
                    </span>
                  </div>
                </button>

                {/* Social Auth */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <div className="flex-grow border-t border-gray-400/20"></div>
                    <span className="px-4 text-sm text-gray-400">OR SIGN IN WITH</span>
                    <div className="flex-grow border-t border-gray-400/20"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center px-4 py-2 border border-white/20 rounded-xl hover:bg-white/10 transition-colors">
                      <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                      <span className="text-white">Google</span>
                    </button>
                    <button className="flex items-center justify-center px-4 py-2 border border-white/20 rounded-xl hover:bg-white/10 transition-colors">
                      <img src="/apple.svg" alt="Apple" className="w-5 h-5 mr-2" />
                      <span className="text-white">Apple</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}