"use client";

import { useI18n } from "@/components/LanguageProvider";
import { useState } from "react";
import { motion } from "framer-motion";

export default function JoinPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    age: "",
    service: "",
    experience: "",
    area: "",
    city: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      age: "",
      service: "",
      experience: "",
      area: "",
      city: ""
    });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
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

      <div className="relative z-10 w-full max-w-4xl mx-6">
        <div className="flex h-[85vh] backdrop-blur-3xl bg-white/5 rounded-[32px] shadow-2xl border border-white/20 overflow-hidden">
          {/* Left Image Section */}
          <div className="w-1/3 relative">
            <div className="h-full bg-gradient-to-b from-green-600 to-green-400 relative overflow-hidden">
              {/* Background Image - using a placeholder for now */}
              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm opacity-80">Professional Image</p>
                </div>
              </div>
              
              {/* Overlay Text */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white px-8">
                  <h2 className="text-4xl font-bold mb-2">JOIN US</h2>
                  <p className="text-lg">while opportunities are available!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="w-2/3 p-8 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl font-bold text-white mb-8">{t("join_title")}</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Personal Information Section */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name *"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name *"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number *"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <input
                        type="email"
                        name="email"
                        placeholder="Email ID (optional)"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <input
                        type="number"
                        name="age"
                        placeholder="Age *"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        min="18"
                        max="65"
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                      >
                        <option value="" className="bg-gray-800 text-white">Select Service Type *</option>
                        <option value="carpenter" className="bg-gray-800 text-white">Carpenter</option>
                        <option value="electrician" className="bg-gray-800 text-white">Electrician</option>
                        <option value="plumber" className="bg-gray-800 text-white">Plumber</option>
                      </select>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <input
                        type="number"
                        name="experience"
                        placeholder="Years of experience *"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        min="0"
                        max="50"
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <input
                        type="text"
                        name="area"
                        placeholder="Area * (e.g., Bandra West)"
                        value={formData.area}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <input
                      type="text"
                      name="city"
                      placeholder="City * (e.g., Mumbai)"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
                    />
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div 
                    className="flex gap-4 pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <motion.button
                      type="submit"
                      className="flex-1 relative group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-2xl blur-sm opacity-0 group-hover:opacity-50 transition duration-300"></div>
                      <div className="relative px-6 py-3.5 bg-green-600/20 rounded-2xl leading-none flex items-center justify-center backdrop-blur-xl border border-green-500/30">
                        <span className="text-white text-base font-medium">SUBMIT</span>
                      </div>
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 relative group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 rounded-2xl blur-sm opacity-0 group-hover:opacity-50 transition duration-300"></div>
                      <div className="relative px-6 py-3.5 bg-gray-600/20 rounded-2xl leading-none flex items-center justify-center backdrop-blur-xl border border-gray-500/30">
                        <span className="text-white text-base font-medium">RESET</span>
                      </div>
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
