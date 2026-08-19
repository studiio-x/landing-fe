"use client";

import { useTranslations } from "next-intl";
import AlertModal from "@/components/common/AlertModal";
import { useSessionExpiredStore } from "@/stores/useSessionExpiredStore";

const SessionExpiredModal = () => {
  const t = useTranslations("sessionExpiredModal");
  const { isOpen, pendingRedirectUrl, close } = useSessionExpiredStore();

  const handleConfirm = () => {
    close();
    if (pendingRedirectUrl) window.location.href = pendingRedirectUrl;
  };

  if (!isOpen) return null;

  return (
    <AlertModal
      isOpen={isOpen}
      onClose={handleConfirm}
      title={t("title")}
      description={t("description")}
      buttons={[
        { label: t("confirmLabel"), variant: "red", onClick: handleConfirm },
      ]}
    />
  );
};

export default SessionExpiredModal;
