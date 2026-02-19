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
import { TEMPLATE_KEYWORDS } from "@/constants/dashboard/template";
import { TemplateKeyword } from "@/types/api/template.type";

interface BackgroundTabProps {
  uploadedImage: File | null;
}

const toItems = (templates: { templateId: number; imageObjectKey: string }[]) =>
  templates.map((t) => ({ id: String(t.templateId), src: t.imageObjectKey }));

const BackgroundTab = ({ uploadedImage }: BackgroundTabProps) => {
  const t = useTranslations("dashboard.workbench.backgroundTab");
  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedBackgroundId, setSelectedBackgroundId] = useState<
    string | null
  >(null);

  const [isProductImageModalOpen, setIsProductImageModalOpen] = useState(false);

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

  const findTemplates = (keyword: TemplateKeyword) =>
    toItems(templatesData?.find((g) => g.keyword === keyword)?.templates ?? []);

  const getTitle = (keyword: TemplateKeyword) =>
    keywords?.find((k) => k.keyword === keyword)?.title ?? "";

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
        onSearch={setSearchKeyword}
      />

      <div
        className={clsx(
          "flex flex-col gap-4 overflow-y-auto",
          isSearching ? "h-[413px]" : "h-[452px]"
        )}
      >
        {searchKeyword ? (
          isSearchLoading || (searchResults && searchResults.length > 0) ? (
            <BackgroundSwiper
              id="search"
              items={toItems(searchResults ?? [])}
              selectedId={selectedBackgroundId}
              onSelect={setSelectedBackgroundId}
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
              selectedId={selectedBackgroundId}
              onSelect={setSelectedBackgroundId}
              isLoading={isLoading}
            />
          ))
        )}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6 Body_2_semibold">
        <GlassButton
          size="md"
          gap="sm"
          className="Body_3_semibold"
          leftIcon={<Plus className="w-[1.375rem] h-[1.375rem]" />}
        >
          {t("uploadBackground")}
        </GlassButton>

        <GlassButton
          size="md"
          variant="red"
          type="button"
          className="Body_2_semibold"
          onClick={handleClickGenerate}
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
