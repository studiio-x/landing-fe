import Image from "next/image";
import { useTranslations } from "next-intl";

export type StudioHistoryItem = {
  id: string;
  imageUrls: [string, string];
};

const StudioHistoryPanel = ({ history }: { history: StudioHistoryItem[] }) => {
  const t = useTranslations("dashboard.studio.historyPanel");
  const isEmpty = history.length === 0;
  const latest = history[0];

  if (isEmpty) {
    return (
      <section className="w-[12.375rem] h-[28.125rem] flex flex-col gap-3 text-center items-center justify-center ml-8 rounded-lg bg-Grey-900">
        <h2 className="Body_2_semibold text-Grey-400 whitespace-pre-line">
          {t("emptyTitle")}
        </h2>
        <span className="Body_3_medium text-Grey-500 whitespace-pre-line">
          {t("emptyDescription")}
        </span>
      </section>
    );
  }

  return (
    <section className="w-[12.375rem] h-[28.125rem] items-center  flex flex-col ml-8 rounded-lg bg-Grey-900 overflow-hidden py-6 px-4">
      <h3 className="Subhead_1_semibold text-Grey-300 mb-[1.19rem]">
        {t("title")}
      </h3>

      <div className="flex flex-col gap-4 w-full h-full">
        {latest.imageUrls.slice(0, 2).map((url, idx) => (
          <Image
            key={`${latest.id}-${idx}`}
            src={url}
            alt={t("imageAlt", { index: idx + 1 })}
            width={166}
            height={166}
            className="w-[10.375rem] h-[10.375rem] object-cover rounded-[0.3479rem]"
          />
        ))}
      </div>
    </section>
  );
};

export default StudioHistoryPanel;
