"use client";

import { useI18n } from "@/components/LanguageProvider";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121312' }}>
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-semibold tracking-tight text-white mb-6"
          >
            {t("contact_title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {t("contact_body")}
          </motion.p>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Ready to connect with our handymen? We're here to help you find the perfect professional for your home maintenance needs.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-amber-900/20 to-black/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-800/30"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#FFC107] p-3 rounded-xl">
                      <Phone className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
                      <p className="text-gray-300">+91 80107 87170</p>
                      <p className="text-sm text-gray-400">Available 24/7</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-amber-900/20 to-black/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-800/30"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#FFC107] p-3 rounded-xl">
                      <Mail className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                      <p className="text-gray-300">mrhandy.team@gmail.com</p>
                      <p className="text-sm text-gray-400">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-amber-900/20 to-black/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-800/30"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#FFC107] p-3 rounded-xl">
                      <MapPin className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Service Areas</h3>
                      <p className="text-gray-300">Mumbai, Delhi, Bangalore</p>
                      <p className="text-sm text-gray-400">Expanding nationwide</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-amber-900/20 to-black/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-800/30"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#FFC107] p-3 rounded-xl">
                      <Clock className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Business Hours</h3>
                      <p className="text-gray-300">24/7 Emergency Service</p>
                      <p className="text-sm text-gray-400">Regular bookings: 8 AM - 8 PM</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-amber-900/20 to-black/40 backdrop-blur-sm rounded-3xl p-8 border border-amber-800/30"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-[#FFC107] mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all"
                      >
                        <option value="" className="bg-gray-800">Select a service</option>
                        <option value="carpentry" className="bg-gray-800">Carpentry Services</option>
                        <option value="plumbing" className="bg-gray-800">Plumbing Services</option>
                        <option value="electrical" className="bg-gray-800">Electrical Services</option>
                        <option value="general" className="bg-gray-800">General Maintenance</option>
                        <option value="other" className="bg-gray-800">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your project or requirements..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#FFC107] text-black font-semibold py-4 px-8 rounded-xl hover:bg-[#FFC107]/90 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-300 text-lg">Quick answers to common questions</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How quickly can I get a handyman?",
                answer: "We can connect you with a handyman within 2-4 hours for urgent repairs, or schedule appointments for the next day."
              },
              {
                question: "Are your handymen certified?",
                answer: "Yes, all our handymen are thoroughly vetted, certified professionals with years of experience in their respective fields."
              },
              {
                question: "What services do you offer?",
                answer: "We provide carpentry, plumbing, electrical work, HVAC maintenance, and general home repair services."
              },
              {
                question: "Do you provide emergency services?",
                answer: "Yes, we offer 24/7 emergency services for urgent repairs like water leaks, electrical issues, and security problems."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-amber-900/20 to-black/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-800/30"
              >
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
    </section>
    </div>
  );
}
