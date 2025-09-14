"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

interface AuthLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function AuthLink({ href, children, className = "" }: AuthLinkProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Link
        href={href}
        className={`text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 ${className}`}
      >
        {children}
      </Link>
    </motion.span>
  );
}
