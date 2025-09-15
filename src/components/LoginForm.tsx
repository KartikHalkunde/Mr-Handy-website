"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthCard } from '@/components/auth/AuthCard';
import { FormInput } from '@/components/auth/FormInput';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { AuthLink } from '@/components/auth/AuthLink';
import { SuccessPopup } from '@/components/SuccessPopup';
import { validateLoginForm } from '@/lib/validation';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  [key: string]: string;
}

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('/dashboard');

  // Get redirect URL from query params
  useEffect(() => {
    const callbackUrl = searchParams.get('callbackUrl');
    if (callbackUrl) {
      setRedirectUrl(callbackUrl);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateLoginForm(formData);
    
    if (!validation.isValid) {
      const errorMap: FormErrors = {};
      validation.errors.forEach(error => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Show success popup
        setShowSuccessPopup(true);
      } else {
        // Handle validation errors
        if (data.errors) {
          const errorMap: FormErrors = {};
          data.errors.forEach((error: { field: string; message: string }) => {
            errorMap[error.field] = error.message;
          });
          setErrors(errorMap);
        } else {
          setErrors({ general: data.message });
        }
      }
    } catch {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    // Redirect after popup closes
    router.push(redirectUrl);
  };

  return (
    <AuthCard 
      title="Welcome Back" 
      subtitle="Sign in to your Mr. Handy account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error */}
        <AnimatePresence>
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg"
            >
              {errors.general}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email */}
        <div>
          <FormInput
            type="email"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            error={errors.email}
            required
          />
        </div>

        {/* Password */}
        <div>
          <PasswordInput
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            error={errors.password}
            required
          />
        </div>

        {/* Submit Button */}
        <AuthButton
          type="submit"
          loading={loading}
          disabled={loading}
        >
          Sign In
        </AuthButton>

        {/* Signup Link */}
        <div className="text-center">
          <p className="text-gray-300">
            Don&apos;t have an account?{' '}
            <AuthLink href="/signup">
              Create Account
            </AuthLink>
          </p>
        </div>
      </form>
      
      {/* Success Popup */}
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={handleSuccessPopupClose}
        message="You've signed in successfully!"
      />
    </AuthCard>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
