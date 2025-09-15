"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, User, Calendar, Settings, Wrench, Edit, Save, X } from 'lucide-react';
import { AuthButton } from '@/components/auth/AuthButton';
import { useI18n } from '@/components/LanguageProvider';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: ''
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();

        if (data.success) {
          setUser(data.user);
          setEditForm({
            name: data.user.name,
            email: data.user.email
          });
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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditForm({
        name: user?.name || '',
        email: user?.email || ''
      });
    }
    setMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setUpdateLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editForm.name,
          email: editForm.email
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(prev => prev ? { ...prev, ...editForm } : null);
        setMessage('Profile updated successfully!');
        setIsEditing(false);
      } else {
        setMessage(data.error || 'Failed to update profile');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setUpdateLoading(false);
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
                {t("dashboard_logout")}
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
            {t("dashboard_welcome")}, {user.name}!
          </h2>
          <p className="text-gray-300">
            {t("dashboard_subtitle")}
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
                <p className="text-sm font-medium text-gray-400">{t("dashboard_profile")}</p>
                <p className="text-2xl font-semibold text-white">{t("dashboard_complete")}</p>
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
                <p className="text-sm font-medium text-gray-400">{t("dashboard_bookings")}</p>
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
                <p className="text-sm font-medium text-gray-400">{t("dashboard_services")}</p>
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
                <p className="text-sm font-medium text-gray-400">{t("dashboard_settings")}</p>
                <p className="text-2xl font-semibold text-white">{t("dashboard_active")}</p>
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
              {t("dashboard_quick_actions")}
            </h3>
            <div className="space-y-3">
              <AuthButton
                type="button"
                variant="primary"
                className="w-full justify-center"
              >
                <Wrench className="w-4 h-4 mr-2" />
                {t("dashboard_book_service")}
              </AuthButton>
              <AuthButton
                type="button"
                variant="secondary"
                className="w-full justify-center"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {t("dashboard_view_bookings")}
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                {t("dashboard_account_info")}
              </h3>
              <button
                onClick={handleEditToggle}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                {isEditing ? t("dashboard_cancel") : t("dashboard_edit")}
              </button>
            </div>

            {/* Message Display */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 p-3 rounded-lg ${
                  message.includes('success') 
                    ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                    : 'bg-red-500/20 border border-red-500/30 text-red-300'
                }`}
              >
                {message}
              </motion.div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-400">{t("contact_full_name")}</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white">{user.name}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">{t("contact_email_address")}</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white">{user.email}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">{t("dashboard_member_since")}</label>
                <p className="text-white">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              {isEditing && (
                <div className="pt-4">
                  <button
                    onClick={handleUpdateProfile}
                    disabled={updateLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {updateLoading ? t("dashboard_saving") : t("dashboard_save_changes")}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}