export const STUDIO_TABS = ["제품", "배경", "AI 챗봇"] as const;

export const WORKBENCH_TABS = [
  { label: "스튜디오", mode: "studio" as const, width: "5.5rem" },
  { label: "모델", mode: "model" as const, width: "3.75rem" },
] as const;