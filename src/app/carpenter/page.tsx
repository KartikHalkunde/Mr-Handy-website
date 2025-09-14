"use client";

import { ServicePage } from "@/components/ServicePage";
import { useI18n } from "@/components/LanguageProvider";

export default function CarpenterLanding() {
  const { t } = useI18n();
  return (
    <ServicePage
      serviceType="carpenter"
      title={t("carpentry_title")}
      description={t("carpentry_desc")}
    />
  );
}


