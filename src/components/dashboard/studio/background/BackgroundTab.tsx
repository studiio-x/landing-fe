"use client";

import { useState } from "react";
import clsx from "clsx";
import { Plus } from "@/assets/icons";

import BackgroundSwiper from "./BackgroundSwiper";
import SearchBar from "./SearchBar";
import ProductImageRequiredModal from "./ProductImageRequiredModal";
import GlassButton from "@/components/common/GlassButton";

interface BackgroundTabProps {
  uploadedImage: File | null;
}

const BackgroundTab = ({ uploadedImage }: BackgroundTabProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBackgroundId, setSelectedBackgroundId] = useState<
    string | null
  >(null);

  const [isProductImageModalOpen, setIsProductImageModalOpen] = useState(false);

  const displayBackgrounds = Array.from({ length: 6 }, (_, idx) => ({
    id: `display-${idx}`,
    src: "/images/landing/product1.png",
  }));

  const fabricBackgrounds = Array.from({ length: 6 }, (_, idx) => ({
    id: `fabric-${idx}`,
    src: "/images/landing/product2.png",
  }));

  const outdoorBackgrounds = Array.from({ length: 6 }, (_, idx) => ({
    id: `outdoor-${idx}`,
    src: "/images/landing/product3.png",
  }));

  const handleClickGenerate = () => {
    if (!uploadedImage) {
      setIsProductImageModalOpen(true);
      return;
    }

    console.log("생성 시작", { uploadedImage, selectedBackgroundId });
  };

  return (
    <div className="mt-5">
      <SearchBar
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        onSearch={(keyword) => {
          console.log("검색어:", keyword);
        }}
      />

      <div
        className={clsx(
          "flex flex-col gap-4 overflow-y-auto",
          isSearching ? "h-[413px]" : "h-[452px]"
        )}
      >
        <BackgroundSwiper
          id="display"
          title="일반 디스플레이"
          items={displayBackgrounds}
          selectedId={selectedBackgroundId}
          onSelect={setSelectedBackgroundId}
        />
        <BackgroundSwiper
          id="fabric"
          title="패브릭 & 벨벳"
          items={fabricBackgrounds}
          selectedId={selectedBackgroundId}
          onSelect={setSelectedBackgroundId}
        />
        <BackgroundSwiper
          id="outdoor"
          title="아웃도어"
          items={outdoorBackgrounds}
          selectedId={selectedBackgroundId}
          onSelect={setSelectedBackgroundId}
        />
      </div>

      <div className="flex items-center justify-center gap-4 mt-6 Body_2_semibold">
        <GlassButton
          size="md"
          gap="sm"
          className="Body_3_semibold"
          leftIcon={<Plus className="w-4 h-4" />}
        >
          배경 업로드
        </GlassButton>

        <GlassButton
          size="md"
          variant="red"
          type="button"
          className="Body_2_semibold"
          onClick={handleClickGenerate}
        >
          생성하기
        </GlassButton>
      </div>

      {isProductImageModalOpen && (
        <ProductImageRequiredModal
          onClose={() => setIsProductImageModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BackgroundTab;
