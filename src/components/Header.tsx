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
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-black/10 bg-white text-black hover:bg-white transition"
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
            className="inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/15 p-2 bg-white text-black hover:bg-gray-100 transition shadow-sm"
          >
            {/* Simple hamburger icon */}
            <span className="block w-5 h-0.5 bg-black mb-1" />
            <span className="block w-5 h-0.5 bg-black mb-1" />
            <span className="block w-5 h-0.5 bg-black" />
          </button>
        </div>
      </div>
      {/* Mobile slide-over menu (only on mobile) */}
      {mobileOpen && (
        <div className="sm:hidden fixed inset-0 z-50" aria-modal="true" role="dialog">
          {/* Backdrop */}
          <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-black" />
          {/* Panel */}
          <div className="absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-black text-white border-l border-white/10 shadow-xl translate-x-0 transition-transform">
            <div className="px-5 py-5">
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-semibold text-white/70">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="rounded-md border border-white/15 px-2.5 py-1.5 text-sm hover:bg-white/10">Close</button>
              </div>
              <nav className="flex flex-col text-sm">
                <Link href="/about" className="py-2.5 rounded hover:bg-white/10 px-2" onClick={() => setMobileOpen(false)}>{t("nav_about")}</Link>
                <Link href="/contact" className="py-2.5 rounded hover:bg-white/10 px-2" onClick={() => setMobileOpen(false)}>{t("nav_contact")}</Link>
                <Link href="/join" className="py-2.5 rounded hover:bg-white/10 px-2" onClick={() => setMobileOpen(false)}>{t("nav_join")}</Link>
              </nav>
              <div className="pt-4 mt-4 border-t border-white/10">
                {status === "loading" ? (
                  <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse" />
                ) : session?.user ? (
                  <div className="flex flex-col gap-2">
                    <Link href="/dashboard" className="py-2.5 px-2 rounded hover:bg-white/10 flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button onClick={async () => { setMobileOpen(false); await signOut({ callbackUrl: "/" }); }} className="py-2.5 px-2 rounded hover:bg-white/10 flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                ) : (
                  <a href="/auth" onClick={() => setMobileOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 w-full rounded-lg border border-white/15 bg-white text-black hover:bg-white/90 transition shadow-sm">
                    <User className="h-4 w-4" />
                    {t('signIn')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


