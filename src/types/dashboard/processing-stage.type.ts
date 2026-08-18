// 워크벤치 전역에서 공유하는 로딩 단계 텍스트.
export type ProcessingStage =
  | "cutout"
  | "compositing"
  | "generatingVideo"
  | null;
