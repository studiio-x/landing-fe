import { LanguageOption } from "@/types/mypage/language.type";
import { TabKey } from "@/types/mypage/tab.type";

export const MYPAGE_TABS: Array<{ key: TabKey; label: string }> = [
  { key: "settings", label: "설정" },
  { key: "upgrade", label: "요금제 업그레이드" },
];

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: "ko", label: "한국어", subLabel: "Korean" },
  { value: "en", label: "English", subLabel: "English" },
];
