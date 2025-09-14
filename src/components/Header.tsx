"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/components/LanguageProvider";
import { User, LogOut } from "lucide-react";

export function Header() {
  const { t } = useI18n();
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = async () => {
    setShowDropdown(false);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30">
      <div className="w-full px-16 py-3 grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="justify-self-start">
          <Link href="/" className="flex items-center">
            <Image
              src="/mr-handy-logo.png"
              alt={t("brand")}
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-semibold justify-self-center">
          <Link href="/about" className="hover:opacity-80 transition-opacity">{t("nav_about")}</Link>
          <Link href="/contact" className="hover:opacity-80 transition-opacity">{t("nav_contact")}</Link>
          <Link href="/join" className="hover:opacity-80 transition-opacity">{t("nav_join")}</Link>
        </nav>
        <div className="flex items-center gap-3 justify-self-end">
          <LanguageSwitcher />
          {status === "loading" ? (
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          ) : session?.user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white transition-all"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {session.user.name?.[0].toUpperCase() ?? "U"}
                </div>
                <span className="text-sm font-medium">{session.user.name ?? "User"}</span>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href="/dashboard"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/auth"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-gray-100 backdrop-blur-sm border border-white/20 text-black transition-all"
            >
              <User className="h-4 w-4" />
              {t('signIn')}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}


