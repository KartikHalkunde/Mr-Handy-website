"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, User, Calendar, Settings, Wrench } from 'lucide-react';
import { AuthButton } from '@/components/auth/AuthButton';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();

        if (data.success) {
          setUser(data.user);
        } else {
          // Redirect to login if not authenticated
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        // Redirect to home page
        router.push('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLogoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Mr. Handy</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user.name}</span>
              <AuthButton
                type="button"
                onClick={handleLogout}
                loading={logoutLoading}
                disabled={logoutLoading}
                variant="secondary"
                className="px-4 py-2"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </AuthButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="text-gray-300">
            Manage your home maintenance services and bookings
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-900 rounded-lg shadow p-6 border border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Profile</p>
                <p className="text-2xl font-semibold text-white">Complete</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-900 rounded-lg shadow p-6 border border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Bookings</p>
                <p className="text-2xl font-semibold text-white">0</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-900 rounded-lg shadow p-6 border border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Wrench className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Services</p>
                <p className="text-2xl font-semibold text-white">3</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-900 rounded-lg shadow p-6 border border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Settings</p>
                <p className="text-2xl font-semibold text-white">Active</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-900 rounded-lg shadow p-6 border border-gray-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <AuthButton
                type="button"
                variant="primary"
                className="w-full justify-center"
              >
                <Wrench className="w-4 h-4 mr-2" />
                Book a Service
              </AuthButton>
              <AuthButton
                type="button"
                variant="secondary"
                className="w-full justify-center"
              >
                <Calendar className="w-4 h-4 mr-2" />
                View Bookings
              </AuthButton>
            </div>
          </motion.div>

          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-900 rounded-lg shadow p-6 border border-gray-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Account Information
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-400">Name</label>
                <p className="text-white">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Email</label>
                <p className="text-white">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Member Since</label>
                <p className="text-white">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}