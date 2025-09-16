import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Mail, Phone } from "lucide-react";
import React from "react";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[95%] rounded-tl-[3rem] rounded-tr-[3rem] px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Social Media */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-3">Find us on</h3>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Link href="https://www.instagram.com/reel/DMAy0YzTE58/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="hover:text-white/90 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="https://www.instagram.com/reel/C8n7PXwiMCh/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="hover:text-white/90 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="https://youtube.com/shorts/YJ0cyfXcKwI?si=8JpCDxCgILi1gsq5" target="_blank" rel="noopener noreferrer" className="hover:text-white/90 transition-colors">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Company Logo */}
          <div className="text-center">
            <Image
              src="/mr-handy-footer-logo.png"
              alt="Mr. Handy Logo"
              width={120}
              height={60}
              className="mx-auto"
            />
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold text-lg mb-3">Customer Support</h3>
            <div className="space-y-1 text-sm text-gray-300">
              <div className="flex items-center gap-2 justify-center md:justify-end">
                <Mail size={14} />
                <span>mrhandy.team@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-end">
                <Phone size={14} />
                <span>+91 80107 87170</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800">
        <div className="w-full px-4 py-2 text-center text-sm font-bold text-black bg-[#FFC107]">
          <span className="font-bold">©</span> {new Date().getFullYear()} Mr. Handy
        </div>
      </div>
    </footer>
  );
}


