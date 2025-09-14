"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/mr-handy-logo.png"
              alt="Mr. Handy"
              width={120}
              height={40}
              className="h-12 w-auto"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-300">
                {subtitle}
              </p>
            )}
          </div>

          {/* Content */}
          {children}
        </div>
      </motion.div>
    </div>
  );
}
