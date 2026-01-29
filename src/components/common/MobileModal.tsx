"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ModalOverlay from "./ModalOverlay";
import { Close } from "@/assets/icons";
import mobilePreview from "@/assets/svg/mobile-preview.svg";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTranslations } from "next-intl";

const DESKTOP_CONTAINER_WIDTH = 1244;

const MobileModal = () => {
  const t = useTranslations("mobileModal");
  const [isClosed, setIsClosed] = useState(false);
  const isSmallScreen = useMediaQuery(DESKTOP_CONTAINER_WIDTH);

  useEffect(() => {
    if (!isSmallScreen) {
      setIsClosed(false);
    }
  }, [isSmallScreen]);

  const handleClose = () => setIsClosed(true);

  if (!isSmallScreen || isClosed) return null;

  return (
    <ModalOverlay className="bg-Black/70" onClose={handleClose}>
      <div className="bg-Grey-700/90 relative w-80 rounded-lg flex flex-col items-center gap-11 shadow-[0_0px_12px_rgba(8,8,8,0.25)] backdrop-blur-[5px]">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4"
          aria-label={t("closeLabel")}
        >
          <Close className="w-6 h-6" />
        </button>

        <h1 className="Subhead_2_semibold text-Grey-100 mt-[3.25rem] text-center whitespace-pre-line">
          {t("title")}
        </h1>

        <div className="w-full h-[166px] overflow-hidden rounded-b-lg mb-11">
          <Image
            src={mobilePreview}
            alt={t("imageAlt")}
            width={320}
            height={166}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </ModalOverlay>
  );
};
export default MobileModal;
