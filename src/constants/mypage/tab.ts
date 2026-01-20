export type TabKey = "settings" | "upgrade";

export const MYPAGE_TABS: Array<{ key: TabKey; label: string }> = [
  { key: "settings", label: "설정" },
  { key: "upgrade", label: "요금제 업그레이드" },
];
