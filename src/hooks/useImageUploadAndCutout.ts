import { useState } from "react";

import { getRawPresign, postCutoutImage } from "@/apis/imageApi";

export const useImageUploadAndCutout = (folderId: number) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [cutoutImageUrl, setCutoutImageUrl] = useState<string | null>(null);

  const uploadAndCutout = async (file: File) => {
    setIsProcessing(true);
    setCutoutImageUrl(null);

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

      const { cutoutImageUrl: resultUrl } = await postCutoutImage({
        rawObjectKey: objectKey,
        folderId,
      });

      setCutoutImageUrl(resultUrl);
    } catch (error) {
      console.error("누끼 처리 실패:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetCutout = () => {
    setCutoutImageUrl(null);
  };

  return { isProcessing, cutoutImageUrl, uploadAndCutout, resetCutout };
};
