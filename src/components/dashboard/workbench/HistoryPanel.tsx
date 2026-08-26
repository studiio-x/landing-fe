import Image from "next/image";
import { useTranslations } from "next-intl";
import type { WorkbenchMode } from "@/types/dashboard/mode.type";

export type HistoryItem = {
  id: string;
  imageUrl: string;
};

interface HistoryPanelProps {
  history: HistoryItem[];
  mode: WorkbenchMode;
  onSelectImage?: (imageUrl: string) => void;
}

const HistoryPanel = ({ history, mode, onSelectImage }: HistoryPanelProps) => {
  const t = useTranslations("dashboard.workbench.historyPanel");
  const isVideo = mode === "video";

  if (history.length === 0) {
    return (
      <section className="w-49.5 h-112.5 flex flex-col gap-3 text-center items-center justify-center ml-8 rounded-lg bg-Grey-900">
        <h2 className="Body_2_semibold text-Grey-400 whitespace-pre-line">
          {t(isVideo ? "videoEmptyTitle" : "emptyTitle")}
        </h2>
        <span className="Body_3_medium text-Grey-500 whitespace-pre-line">
          {t(isVideo ? "videoEmptyDescription" : "emptyDescription")}
        </span>
      </section>
    );
  }

  return (
    <section className="w-49.5 h-112.5 items-center flex flex-col ml-8 rounded-lg bg-Grey-900 overflow-hidden py-6 px-4">
      <h3 className="Subhead_1_semibold text-Grey-300 mb-[1.19rem]">
        {t("title")}
      </h3>

      <div className="flex flex-col gap-4 w-full h-full overflow-y-auto">
        {history.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectImage?.(item.imageUrl)}
            className="shrink-0 rounded-[0.3479rem] overflow-hidden hover:ring-2 hover:ring-Red-400 transition-all cursor-pointer"
          >
            <Image
              src={item.imageUrl}
              alt={t("imageAlt", { index: idx + 1 })}
              width={166}
              height={166}
              className="w-41.5 h-41.5 object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default HistoryPanel;
