import { useCallback, useState } from "react";

import { getRawPresign, postCutoutImage } from "@/apis/imageApi";

export const useImageUploadAndCutout = (folderId: number) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cutoutImageUrl, setCutoutImageUrl] = useState<string | null>(null);
  const [cutoutImageObjectKey, setCutoutImageObjectKey] = useState<
    string | null
  >(null);
  const [projectId, setProjectId] = useState<number | null>(null);

  const uploadAndCutout = useCallback(
    async (file: File) => {
      setIsProcessing(true);
      setCutoutImageUrl(null);
      setCutoutImageObjectKey(null);
      setProjectId(null);

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
        console.error("누끼 처리 실패:", error);
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
  }, []);

  return {
    isProcessing,
    cutoutImageUrl,
    cutoutImageObjectKey,
    projectId,
    uploadAndCutout,
    resetCutout,
  };
};
