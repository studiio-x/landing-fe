import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { getRawPresign, postCutoutImage } from "@/apis/imageApi";
import { usePostImage } from "@/hooks/queries/useImageApi";
import { getErrorMessage } from "@/utils/apiUtils";
import type { ProcessingStage } from "@/types/dashboard/processing-stage.type";

const ERROR_FADE_DELAY_MS = 1500;
const ERROR_FADE_DURATION_MS = 300;

interface UseImageUploadAndCutoutOptions {
  templateId?: number | null;
  onBackgroundGenerated?: (imageUrl: string) => void;
  onStageChange?: (stage: ProcessingStage) => void;
}

export const useImageUploadAndCutout = (
  folderId: number,
  {
    templateId,
    onBackgroundGenerated,
    onStageChange,
  }: UseImageUploadAndCutoutOptions = {},
) => {
  const t = useTranslations("dashboard.workbench");
  const { mutateAsync: postImage } = usePostImage();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isCutoutImageLoading, setIsCutoutImageLoading] = useState(false);
  const [cutoutImageUrl, setCutoutImageUrl] = useState<string | null>(null);
  const [cutoutImageObjectKey, setCutoutImageObjectKey] = useState<
    string | null
  >(null);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [cutoutError, setCutoutError] = useState<string | null>(null);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const uploadAndCutout = useCallback(
    async (file: File) => {
      setIsProcessing(true);
      onStageChange?.("cutout");
      setCutoutImageUrl(null);
      setCutoutImageObjectKey(null);
      setProjectId(null);
      setCutoutError(null);

      try {
        const { uploadUrl, objectKey } = await getRawPresign();
        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file");
        }

        const {
          cutoutImageUrl: resultUrl,
          cutoutImageObjectKey: resultObjectKey,
          projectId: resultProjectId,
        } = await postCutoutImage({
          rawObjectKey: objectKey,
          folderId,
        });

        setCutoutImageUrl(resultUrl);
        setCutoutImageObjectKey(resultObjectKey);
        setProjectId(resultProjectId);

        if (templateId) {
          onStageChange?.("compositing");
          const { imageUrl } = await postImage({
            cutoutImageObjectKey: resultObjectKey,
            templateId,
            projectId: resultProjectId,
          });
          onBackgroundGenerated?.(imageUrl);
        }
      } catch (error) {
        setCutoutError(getErrorMessage(error, t("cutoutErrorMessage")));
      } finally {
        setIsProcessing(false);
        onStageChange?.(null);
      }
    },
    [folderId, t, templateId, postImage, onBackgroundGenerated, onStageChange],
  );

  const resetCutout = useCallback(() => {
    setCutoutImageUrl(null);
    setCutoutImageObjectKey(null);
    setProjectId(null);
    setCutoutError(null);
  }, []);

  const uploadAndCutoutRef = useRef(uploadAndCutout);
  uploadAndCutoutRef.current = uploadAndCutout;

  useEffect(() => {
    setIsCutoutImageLoading(false);

    if (!uploadedImage) {
      setPreviewUrl(null);
      resetCutout();
      return;
    }

    const url = URL.createObjectURL(uploadedImage);
    setPreviewUrl(url);
    uploadAndCutoutRef.current(uploadedImage);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [uploadedImage, resetCutout]);

  useEffect(() => {
    if (cutoutImageUrl) setIsCutoutImageLoading(true);
  }, [cutoutImageUrl]);

  useEffect(() => {
    if (!cutoutError) return;
    setIsErrorVisible(true);

    const fadeTimer = setTimeout(
      () => setIsErrorVisible(false),
      ERROR_FADE_DELAY_MS,
    );
    const resetTimer = setTimeout(
      () => setUploadedImage(null),
      ERROR_FADE_DELAY_MS + ERROR_FADE_DURATION_MS,
    );

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(resetTimer);
    };
  }, [cutoutError]);

  return {
    uploadedImage,
    setUploadedImage,
    previewUrl,
    isProcessing,
    isCutoutImageLoading,
    setIsCutoutImageLoading,
    cutoutImageUrl,
    cutoutImageObjectKey,
    projectId,
    cutoutError,
    isErrorVisible,
  };
};
