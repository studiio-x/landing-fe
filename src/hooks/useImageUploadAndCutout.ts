import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { getRawPresign, postCutoutImage } from "@/apis/imageApi";
import { usePostImage } from "@/hooks/queries/useImageApi";
import { useToastStore } from "@/stores/useToastStore";
import { getErrorMessage } from "@/utils/apiUtils";
import type { ProcessingStage } from "@/types/dashboard/processing-stage.type";

// 에러를 토스트로 띄운 뒤, 재시도할 수 있게 업로드 상태를 초기화하기까지의 지연.
const ERROR_RESET_DELAY_MS = 1800;

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
          try {
            const { imageUrl } = await postImage({
              cutoutImageObjectKey: resultObjectKey,
              templateId,
              projectId: resultProjectId,
            });
            onBackgroundGenerated?.(imageUrl);
          } catch (compositeError) {
            useToastStore
              .getState()
              .showToast(
                getErrorMessage(
                  compositeError,
                  t("backgroundCompositeErrorMessage"),
                ),
              );
          }
        }
      } catch (error) {
        const message = getErrorMessage(error, t("cutoutErrorMessage"));
        setCutoutError(message);
        useToastStore.getState().showToast(message);
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

    const resetTimer = setTimeout(
      () => setUploadedImage(null),
      ERROR_RESET_DELAY_MS,
    );

    return () => clearTimeout(resetTimer);
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
  };
};
