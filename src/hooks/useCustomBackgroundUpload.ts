import { useRef } from "react";

import { getCustomTemplatePresign } from "@/apis/imageApi";
import { usePostCustomBackgroundImage } from "@/hooks/queries/useImageApi";

interface UseCustomBackgroundUploadOptions {
  cutoutImageObjectKey: string | null;
  projectId: number | null;
  onGenerated: (imageUrl: string) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
}

// 사용자가 배경 이미지를 직접 업로드하면, presign으로 S3에 올린 뒤
// 누끼 이미지와 합성해서 결과 imageUrl을 돌려주는 흐름을 캡슐화한다.
export const useCustomBackgroundUpload = ({
  cutoutImageObjectKey,
  projectId,
  onGenerated,
  onGeneratingChange,
}: UseCustomBackgroundUploadOptions) => {
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

    onGeneratingChange(true);
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
    }
  };

  return { inputRef, isUploading, openFilePicker, handleFileChange };
};
