import { useState } from "react";

import { getVideoImagePresign } from "@/apis/videoApi";
import { usePostVideo } from "@/hooks/queries/useVideoApi";
import type { MotionType, QualityType } from "@/types/api/video.type";
import type { ProcessingStage } from "@/types/dashboard/processing-stage.type";

export interface VideoGeneratedResult {
  videoUrl: string;
  imageId: number;
  projectId: number;
}

interface UseVideoGenerationOptions {
  folderId: number;
  onGenerated: (result: VideoGeneratedResult) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
  onStageChange?: (stage: ProcessingStage) => void;
  onError?: (error: unknown) => void;
}

// 업로드된 원본 이미지를 비디오 생성용 presign으로 S3에 올린 뒤,
// 선택된 모션/화질로 비디오 생성을 요청하는 흐름을 캡슐화한다.
export const useVideoGeneration = ({
  folderId,
  onGenerated,
  onGeneratingChange,
  onStageChange,
  onError,
}: UseVideoGenerationOptions) => {
  const { mutateAsync: postVideo } = usePostVideo();
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = async (
    file: File,
    motionType: MotionType,
    qualityType: QualityType,
  ) => {
    if (isGenerating) return;

    setIsGenerating(true);
    onGeneratingChange(true);
    onStageChange?.("generatingVideo");
    try {
      const { uploadUrl, objectKey } = await getVideoImagePresign();
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload video source image");
      }

      const { videoUrl, imageId, projectId } = await postVideo({
        params: { motionType, qualityType },
        body: { imageObjectKey: objectKey, folderId },
      });

      onGenerated({ videoUrl, imageId, projectId });
    } catch (error) {
      onError?.(error);
    } finally {
      setIsGenerating(false);
      onGeneratingChange(false);
      onStageChange?.(null);
    }
  };

  return { generate, isGenerating };
};
