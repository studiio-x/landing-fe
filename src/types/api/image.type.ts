// POST /api/v1/image/cutout
export interface PostCutoutImageRequest {
  rawObjectKey: string;
  folderId: number;
}

export interface PostCutoutImageResponse {
  projectId: number;
  cutoutImageObjectKey: string;
  cutoutImageUrl: string;
}

// POST /api/v1/image
export interface PostImageRequest {
  cutoutImageObjectKey: string;
  templateId: number;
  projectId: number;
}

export interface PostImageResponse {
  imageId: number;
  imageUrl: string;
}

// GET /api/v1/image/{imageId}
export interface GetImageResponse {
  imageId: number;
  imageUrl: string;
  projectId: number;
  templateId: number;
  folderId: number;
}

// GET /api/v1/image/raw/presign
export interface GetRawPresignResponse {
  uploadUrl: string;
  rawImageObjectKey: string;
  rawImageUrl: string;
}
