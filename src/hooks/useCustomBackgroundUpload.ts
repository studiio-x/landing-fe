import { useRef } from "react";
import { useTranslations } from "next-intl";

import { getCustomTemplatePresign } from "@/apis/imageApi";
import { usePostCustomBackgroundImage } from "@/hooks/queries/useImageApi";
import { acceptImageFile } from "@/utils/imageFileValidation";
import type { ProcessingStage } from "@/types/dashboard/processing-stage.type";

interface UseCustomBackgroundUploadOptions {
  cutoutImageObjectKey: string | null;
  projectId: number | null;
  onGenerated: (imageUrl: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onStageChange?: (stage: ProcessingStage) => void;
}

// 사용자가 배경 이미지를 직접 업로드하면, presign으로 S3에 올린 뒤
// 누끼 이미지와 합성해서 결과 imageUrl을 돌려주는 흐름을 캡슐화한다.
export const useCustomBackgroundUpload = ({
  cutoutImageObjectKey,
  projectId,
  onGenerated,
  onGeneratingChange,
  onStageChange,
}: UseCustomBackgroundUploadOptions) => {
  const t = useTranslations("dashboard.workbench");
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: postCustomBackgroundImage, isPending: isUploading } =
    usePostCustomBackgroundImage();

  const openFilePicker = () => {
    if (!cutoutImageObjectKey || !projectId) return;
    inputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !cutoutImageObjectKey || !projectId) return;
    if (!acceptImageFile(file, t("unsupportedImageFormat"))) return;

    onGeneratingChange(true);
    onStageChange?.("compositing");
    try {
      const { uploadUrl, objectKey } = await getCustomTemplatePresign();
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload background image");
      }

      const { imageUrl } = await postCustomBackgroundImage({
        cutoutImageObjectKey,
        customBackgroundImageObjectKey: objectKey,
        projectId,
      });

      onGenerated(imageUrl);
    } finally {
      onGeneratingChange(false);
      onStageChange?.(null);
    }
  };

  return { inputRef, isUploading, openFilePicker, handleFileChange };
};
