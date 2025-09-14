"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/LanguageProvider";
import { useSession } from "next-auth/react";

export default function PlumberPage() {
  const { t } = useI18n();
  const router = useRouter();
  const { data: session } = useSession();

  const handleBookNow = () => {
    if (!session) {
      router.push('/auth');
    } else {
      // Handle booking logic for authenticated users
      router.push('/dashboard');
    }
  };

  return (
    <section className="py-16">
      <div className="rounded-3xl p-8 border border-black/5 dark:border-white/10 bg-[linear-gradient(135deg,#d6ecff,#bfe1ff)] text-blue-900">
        <h1 className="text-4xl font-semibold tracking-tight">{t("plumbing_title")}</h1>
        <p className="mt-3 max-w-2xl opacity-80">{t("plumbing_desc")}</p>
        <div className="mt-6 flex gap-3">
          <button 
            onClick={handleBookNow}
            className="rounded-md px-6 py-3 bg-blue-900 text-blue-100 hover:opacity-90 transition"
          >
            {t("book_now")}
          </button>
          <Link href="/" className="rounded-md px-6 py-3 border border-blue-900/20 hover:bg-white/60 transition">{t("back_home")}</Link>
        </div>
      </div>
    </section>
  );
}


