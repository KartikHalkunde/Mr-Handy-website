/**
 * Environment variable validation and configuration
 * This helps catch configuration issues early
 */

export function validateEnv() {
  const requiredEnvVars = {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env file or environment configuration.'
    );
  }

  // Validate NEXTAUTH_SECRET length
  if (process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET.length < 32) {
    console.warn(
      '⚠️  NEXTAUTH_SECRET should be at least 32 characters long for security.'
    );
  }

  return {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
    DATABASE_URL: process.env.DATABASE_URL!,
  };
}

// Validate environment on import (only in production or when explicitly called)
if (process.env.NODE_ENV === 'production' || process.env.VALIDATE_ENV === 'true') {
  try {
    validateEnv();
  } catch (error) {
    console.error('❌ Environment validation failed:', error);
    throw error;
  }
}
