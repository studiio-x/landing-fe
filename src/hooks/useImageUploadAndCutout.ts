import { isAxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

import { getRawPresign, postCutoutImage } from "@/apis/imageApi";

const ERROR_FADE_DELAY_MS = 1500;
const ERROR_FADE_DURATION_MS = 300;

export const useImageUploadAndCutout = (folderId: number) => {
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
          throw new Error("파일 업로드 실패");
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
      } catch (error) {
        const reason = isAxiosError(error)
          ? (error.response?.data?.reason ?? "이미지 처리 중 오류가 발생했습니다.")
          : "이미지 처리 중 오류가 발생했습니다.";
        setCutoutError(reason);
      } finally {
        setIsProcessing(false);
      }
    },
    [folderId],
  );

  const resetCutout = useCallback(() => {
    setCutoutImageUrl(null);
    setCutoutImageObjectKey(null);
    setProjectId(null);
    setCutoutError(null);
  }, []);

  useEffect(() => {
    setIsCutoutImageLoading(false);

    if (!uploadedImage) {
      setPreviewUrl(null);
      resetCutout();
      return;
    }

    const url = URL.createObjectURL(uploadedImage);
    setPreviewUrl(url);
    uploadAndCutout(uploadedImage);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [uploadedImage, resetCutout, uploadAndCutout]);

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
