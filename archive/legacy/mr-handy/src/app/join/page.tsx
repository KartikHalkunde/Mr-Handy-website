"use client";

import { useI18n } from "@/components/LanguageProvider";
import { ServiceProviderForm } from '@/components/auth/ServiceProviderForm';

export default function JoinPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white">{t("join_title")}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">{t("join_body")}</p>
        </div>
        
        <ServiceProviderForm />
      </div>
    </div>
  );
}


