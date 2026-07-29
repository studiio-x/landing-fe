// CONCEPT: 컨셉 이미지 4개 생성 / REFINE: 선택한 이미지 마스크 영역 수정
export type ChatMode = "CONCEPT" | "REFINE";
export type ChatStatus = "IDLE" | string;
export type MessageRole = "USER" | "AI";
export type MessageType = "TEXT" | string;

// POST /chat/{projectId}/message/{mode}
export interface PostChatMessageRequest {
  content: string;
  referenceImageObjectKey?: string;
  maskImageObjectKey?: string;
  imageId?: number;
}

export interface PostChatMessageResponse {
  mode: ChatMode;
  messageId: number;
  aiText: string;
  imageKeys: string[]; // CONCEPT: 최대 4개, REFINE: 1개
}

// POST /chat/{projectId}/concept/select — 컨셉 4개 중 1개 확정 (index: 0~3)
export interface PostConceptSelectRequest {
  selectedIndex: number;
}

export interface PostConceptSelectResponse {
  messageId: number;
  role: MessageRole;
  messageType: MessageType;
  content: string;
  imageKeys: string[];
  createdAt: string;
}

// GET /chat/{projectId} — 채팅 내역 페이지네이션 조회
export interface ChatMessage {
  messageId: number;
  role: MessageRole;
  messageType: MessageType;
  content: string;
  imageKeys: string[];
  createdAt: string;
}

export interface GetChatHistoryResponse {
  chatRoomId: number;
  status: ChatStatus;
  messages: ChatMessage[];
  hasNext: boolean;
}

// GET /chat/{projectId}/reference/presign — 참고 이미지 업로드용 presigned URL
export interface GetReferencePresignResponse {
  uploadUrl: string;
  objectKey: string; // PostChatMessageRequest.referenceImageObjectKey에 사용
}

// GET /chat/{projectId}/mask/presign — 마스크 이미지 업로드용 presigned URL (REFINE 모드)
export interface GetMaskPresignResponse {
  uploadUrl: string;
  objectKey: string; // PostChatMessageRequest.maskImageObjectKey에 사용
}
