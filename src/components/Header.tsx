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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    setShowDropdown(false);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30">
      <div className="w-full px-4 sm:px-8 md:px-16 py-3 grid grid-cols-2 sm:grid-cols-[1fr_auto_1fr] items-center">
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
        <div className="hidden sm:flex items-center gap-3 justify-self-end">
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
        {/* Mobile actions */}
        <div className="flex sm:hidden items-center justify-end gap-2">
          <LanguageSwitcher />
          <button
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/15 p-2 bg-white/80 dark:bg-black/40 hover:bg-white dark:hover:bg-white/10 transition"
          >
            {/* Simple hamburger icon */}
            <span className="block w-5 h-0.5 bg-black dark:bg-white mb-1" />
            <span className="block w-5 h-0.5 bg-black dark:bg-white mb-1" />
            <span className="block w-5 h-0.5 bg-black dark:bg-white" />
          </button>
        </div>
      </div>
      {/* Mobile menu panel */}
      {mobileOpen && (
        <div id="mobile-nav" className="sm:hidden border-t border-black/5 dark:border-white/10 bg-white/95 dark:bg-black/80 backdrop-blur">
          <div className="px-4 py-3 flex flex-col gap-2 text-sm">
            <Link href="/about" className="py-2" onClick={() => setMobileOpen(false)}>{t("nav_about")}</Link>
            <Link href="/contact" className="py-2" onClick={() => setMobileOpen(false)}>{t("nav_contact")}</Link>
            <Link href="/join" className="py-2" onClick={() => setMobileOpen(false)}>{t("nav_join")}</Link>
            <div className="pt-2 border-t border-black/5 dark:border-white/10 mt-1">
              {status === "loading" ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              ) : session?.user ? (
                <>
                  <Link href="/dashboard" className="py-2 flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                    <User className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button onClick={async () => { setMobileOpen(false); await signOut({ callbackUrl: "/" }); }} className="py-2 flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <a href="/auth" onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:opacity-90">
                  <User className="h-4 w-4" />
                  {t('signIn')}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


