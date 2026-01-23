import { WorkbenchMode } from "@/types/dashboard/mode.type";

export const WORKBENCH_TABS: {
  mode: WorkbenchMode;
  widthByLocale: {
    ko: string;
    en: string;
  };
}[] = [
  {
    mode: "studio",
    widthByLocale: {
      ko: "5.5rem",
      en: "5rem",
    },
  },
  {
    mode: "model",
    widthByLocale: {
      ko: "3.75rem",
      en: "4.875rem",
    },
  },
];
