"use client";

import Image from "next/image";
import ModalOverlay from "./ModalOverlay";
import { Close } from "@/assets/icons";
import mobilePreview from "@/assets/svg/mobile-preview.svg";

const MobileModal = () => {
  return (
    <ModalOverlay className="bg-Black/70" onClose={() => {}}>
      <div className="bg-Grey-700/90 w-80 rounded-lg flex flex-col items-center gap-11 shadow-[0_0px_12px_rgba(8,8,8,0.25)] backdrop-blur-[5px]">
        <button
          onClick={() => {}}
          className="absolute top-4 right-4"
          aria-label={"close modal"}
        >
          <Close className="w-6 h-6" />
        </button>
        
        <h1 className="Subhead_2_semibold text-Grey-100 mt-[3.25rem] text-center">
          원활한 이용을 위해
          <br />
          PC 환경에서 접속해 주세요.
        </h1>

        <div className="w-full h-[166px] overflow-hidden rounded-b-lg mb-11">
          <Image
            src={mobilePreview}
            alt="mobile only"
            width={320}
            height={166}
            className="w-full h-auto"
          />
        </div>
      </div>
    </ModalOverlay>
  );
};
export default MobileModal;
