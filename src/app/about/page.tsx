"use client";

import { useI18n } from "@/components/LanguageProvider";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  // Removed unused variable 't'
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121312' }}>
      {/* Hero Video Section */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/about-us-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-semibold tracking-tight mb-4"
            >
              About Mr. Handy
            </motion.h1>
          </div>
        </div>
        {/* Fade effect at bottom with page body color */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#121312] to-transparent"></div>
      </section>

      {/* About Us Info Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-left mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              What we offer
            </h2>
            <div className="max-w-4xl">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                We provide connections to your nearest handymen for free, so there&apos;s no hassle contacting 
                multiple people to get in contact to fix the tap or fix the door. Get handymen contacts 
                one click away.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Our platform connects you with certified professionals in carpentry, plumbing, and electrical work, 
                making home maintenance simple and stress-free.
              </p>
            </div>
          </motion.div>

          {/* Three Feature Boxes */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Certified Service Providers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-black rounded-3xl p-6 border border-gray-700 hover:bg-[#FFC107] hover:border-[#FFC107] hover:shadow-2xl hover:shadow-[#FFC107]/20 transition-all duration-500"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <Image
                  src="/about-certified-providers.jpg"
                  alt="Certified Service Providers"
                  width={300}
                  height={150}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3 w-2 h-2 bg-[#FFC107] rounded-full group-hover:bg-black transition-colors duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-black mb-3 transition-colors duration-300">Certified Service Providers</h3>
              <p className="text-gray-300 group-hover:text-black text-sm leading-relaxed transition-colors duration-300">
                All our handymen are thoroughly vetted and certified professionals with years of experience 
                in their respective fields.
              </p>
            </motion.div>

            {/* 24/7 Customer Care */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-black rounded-3xl p-6 border border-gray-700 hover:bg-[#FFC107] hover:border-[#FFC107] hover:shadow-2xl hover:shadow-[#FFC107]/20 transition-all duration-500"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <Image
                  src="/about-customer-care.jpg"
                  alt="24/7 Customer Care"
                  width={300}
                  height={150}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3 w-2 h-2 bg-[#FFC107] rounded-full group-hover:bg-black transition-colors duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-black mb-3 transition-colors duration-300">24/7 Customer Care</h3>
              <p className="text-gray-300 group-hover:text-black text-sm leading-relaxed transition-colors duration-300">
                Our dedicated support team is available round the clock to assist you with any queries 
                or concerns you may have.
              </p>
            </motion.div>

            {/* Biggest Connection of Handymen */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative bg-black rounded-3xl p-6 border border-gray-700 hover:bg-[#FFC107] hover:border-[#FFC107] hover:shadow-2xl hover:shadow-[#FFC107]/20 transition-all duration-500"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <Image
                  src="/about-handymen-network.jpg"
                  alt="Biggest Connection of Handymen"
                  width={300}
                  height={150}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3 w-2 h-2 bg-[#FFC107] rounded-full group-hover:bg-black transition-colors duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-black mb-3 transition-colors duration-300">Biggest Connection of Handymen</h3>
              <p className="text-gray-300 group-hover:text-black text-sm leading-relaxed transition-colors duration-300">
                We have the largest network of skilled handymen across multiple cities, ensuring you 
                can find the right professional for any job.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Get Connected Hero Section */}
      <section className="relative w-full min-h-[50vh] bg-[#FFC107] flex items-center justify-center">
        <div className="text-center text-black px-4 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-6"
          >
            For more info... contact us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            Have questions about our services? Get in touch with our team for more information.
          </motion.p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-black text-[#FFC107] font-semibold px-8 py-4 rounded-2xl hover:bg-gray-800 transition-colors duration-300"
          >
            Get in Contact
          </motion.a>
        </div>
    </section>
    </div>
  );
}


