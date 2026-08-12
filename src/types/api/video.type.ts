import { ActionKey } from "@/types/dashboard/video-option.type";

// 비디오 모션 타입 (서버 motionType과 1:1 매칭)
export type MotionType = ActionKey;

// 비디오 화질 타입
export type QualityType = "STANDARD" | "HIGH";

// 비디오 생성용 원본 이미지 presigned URL 조회 응답
export interface GetVideoImagePresignResponse {
  uploadUrl: string;
  objectKey: string;
}

// 비디오 생성 요청
export interface PostVideoParams {
  motionType: MotionType;
  qualityType: QualityType;
}

export interface PostVideoRequest {
  imageObjectKey: string;
  folderId: number;
}

// 비디오 생성 응답
export interface PostVideoResponse {
  videoUrl: string;
  imageId: number;
  usedCredits: number;
  status: string;
}
