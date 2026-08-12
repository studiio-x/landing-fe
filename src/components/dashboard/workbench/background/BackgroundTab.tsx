"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Plus } from "@/assets/icons";

import BackgroundSwiper from "./BackgroundSwiper";
import SearchBar from "./SearchBar";
import ProductImageRequiredModal from "./ProductImageRequiredModal";
import GlassButton from "@/components/common/GlassButton";
import { useTemplateKeywords, useTemplatesByKeyword, useSearchTemplates } from "@/hooks/queries/useTemplateApi";
import { usePostImage } from "@/hooks/queries/useImageApi";
import { useCustomBackgroundUpload } from "@/hooks/useCustomBackgroundUpload";
import { TEMPLATE_KEYWORDS } from "@/constants/dashboard/template";
import { TemplateCategory, TemplateKeyword } from "@/types/api/template.type";
import type { WorkbenchMode } from "@/types/dashboard/mode.type";

interface BackgroundTabProps {
  uploadedImage: File | null;
  cutoutImageObjectKey: string | null;
  projectId: number | null;
  mode: WorkbenchMode;
  onGenerated: (imageUrl: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  initialTemplateId?: number | null;
}

const toItems = (
  templates: { templateId: number; imageObjectKey: string; category: TemplateCategory }[],
  category: TemplateCategory,
) =>
  templates
    .filter((t) => t.category === category)
    .map((t) => ({ id: String(t.templateId), src: t.imageObjectKey }));

const BackgroundTab = ({ uploadedImage, cutoutImageObjectKey, projectId, mode, onGenerated, onGeneratingChange, initialTemplateId }: BackgroundTabProps) => {
  const t = useTranslations("dashboard.workbench.backgroundTab");
  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedBackground, setSelectedBackground] = useState<{
    sectionId: string;
    itemId: string;
  } | null>(
    initialTemplateId
      ? { sectionId: "initial", itemId: String(initialTemplateId) }
      : null,
  );

  const [isProductImageModalOpen, setIsProductImageModalOpen] = useState(false);

  const { mutate: postImage, isPending: isGenerating } = usePostImage();
  const {
    inputRef: customBackgroundInputRef,
    isUploading: isUploadingCustomBackground,
    openFilePicker: openCustomBackgroundPicker,
    handleFileChange: handleCustomBackgroundFileChange,
  } = useCustomBackgroundUpload({
    cutoutImageObjectKey,
    projectId,
    onGenerated: (imageUrl) => {
      setSelectedBackground(null);
      onGenerated(imageUrl);
    },
    onGeneratingChange,
  });

  const { data: keywords, isLoading: isKeywordsLoading } = useTemplateKeywords();
  const { data: templatesData, isLoading: isTemplatesLoading } = useTemplatesByKeyword({
    keywords: TEMPLATE_KEYWORDS,
    limitPerKeyword: 9,
  });
  const { data: searchResults, isLoading: isSearchLoading } = useSearchTemplates(
    { keyword: searchKeyword },
    !!searchKeyword,
  );

  useEffect(() => {
    if (!isSearching) setSearchKeyword("");
  }, [isSearching]);

  const isLoading = isKeywordsLoading || isTemplatesLoading;

  const modeCategory = mode.toUpperCase() as TemplateCategory;

  const findTemplates = (keyword: TemplateKeyword) =>
    toItems(
      templatesData?.find((g) => g.keyword === keyword)?.templates ?? [],
      modeCategory,
    );

  const getTitle = (keyword: TemplateKeyword) =>
    keywords?.find((k) => k.keyword === keyword)?.title ?? "";

  const handleClickUploadBackground = () => {
    if (!uploadedImage) {
      setIsProductImageModalOpen(true);
      return;
    }
    openCustomBackgroundPicker();
  };

  const handleClickGenerate = () => {
    if (!uploadedImage) {
      setIsProductImageModalOpen(true);
      return;
    }
    if (!cutoutImageObjectKey || !projectId || !selectedBackground) return;

    onGeneratingChange(true);
    postImage(
      {
        cutoutImageObjectKey,
        templateId: Number(selectedBackground.itemId),
        projectId,
      },
      {
        onSuccess: (data) => {
          onGenerated(data.imageUrl);
          onGeneratingChange(false);
        },
        onError: () => onGeneratingChange(false),
      },
    );
  };

  return (
    <div className="mt-5">
      <SearchBar
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        onSearch={setSearchKeyword}
      />

      <div
        className={clsx(
          "flex flex-col gap-4 overflow-y-auto",
          isSearching ? "h-103.25" : "h-113"
        )}
      >
        {searchKeyword ? (
          isSearchLoading || (searchResults && searchResults.length > 0) ? (
            <BackgroundSwiper
              id="search"
              items={toItems(searchResults ?? [], modeCategory)}
              selectedId={selectedBackground?.sectionId === "search" ? selectedBackground.itemId : null}
              onSelect={(itemId) => setSelectedBackground({ sectionId: "search", itemId })}
              isLoading={isSearchLoading}
            />
          ) : (
            <p className="flex items-center justify-center h-full Body_3_medium text-Grey-500">
              {t("noSearchResults")}
            </p>
          )
        ) : (
          TEMPLATE_KEYWORDS.map((keyword) => (
            <BackgroundSwiper
              key={keyword}
              id={keyword}
              title={getTitle(keyword)}
              items={findTemplates(keyword)}
              selectedId={selectedBackground?.sectionId === keyword ? selectedBackground.itemId : null}
              onSelect={(itemId) => setSelectedBackground({ sectionId: keyword, itemId })}
              isLoading={isLoading}
            />
          ))
        )}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6 Body_2_semibold">
        <input
          type="file"
          ref={customBackgroundInputRef}
          onChange={handleCustomBackgroundFileChange}
          accept="image/*"
          className="hidden"
        />

        <GlassButton
          size="md"
          gap="sm"
          type="button"
          className="Body_3_semibold"
          leftIcon={<Plus className="w-5.5 h-5.5" />}
          onClick={handleClickUploadBackground}
          disabled={isUploadingCustomBackground}
        >
          {t("uploadBackground")}
        </GlassButton>

        <GlassButton
          size="md"
          variant="red"
          type="button"
          className="Body_2_semibold"
          onClick={handleClickGenerate}
          disabled={isGenerating || isUploadingCustomBackground}
        >
          {t("generate")}
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
