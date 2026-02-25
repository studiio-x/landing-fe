// 누끼 이미지 생성 요청
export interface PostCutoutImageRequest {
  rawObjectKey: string;
  folderId: number;
}

// 누끼 이미지 생성 응답
export interface PostCutoutImageResponse {
  projectId: number;
  cutoutImageObjectKey: string;
  cutoutImageUrl: string;
}

// 합성 이미지 생성 요청
export interface PostImageRequest {
  cutoutImageObjectKey: string;
  templateId: number;
  projectId: number;
}

// 합성 이미지 생성 응답
export interface PostImageResponse {
  imageId: number;
  imageUrl: string;
}

// 이미지 상세 조회 응답
export interface GetImageResponse {
  imageId: number;
  imageUrl: string;
  projectId: number;
  templateId: number;
  folderId: number;
}

// 원본 이미지 presigned URL 조회 응답
export interface GetRawPresignResponse {
  uploadUrl: string;
  rawImageObjectKey: string;
  rawImageUrl: string;
}
