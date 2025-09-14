"use client";

import { ServicePage } from "@/components/ServicePage";
import { useI18n } from "@/components/LanguageProvider";

export default function ElectricianLanding() {
  const { t } = useI18n();
  return (
    <ServicePage
      serviceType="electrician"
      title={t("electrical_title")}
      description={t("electrical_desc")}
    />
  );
}


