"use client";

import { ServicePage } from "@/components/ServicePage";
import { useI18n } from "@/components/LanguageProvider";

export default function PlumberLanding() {
  const { t } = useI18n();
  return (
    <ServicePage
      serviceType="plumber"
      title={t("plumbing_title")}
      description={t("plumbing_desc")}
    />
  );
}


