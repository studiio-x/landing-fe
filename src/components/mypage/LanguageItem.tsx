import { LanguageOption } from "@/types/mypage/language";
import clsx from "clsx";

type LanguageItemProps = {
  option: LanguageOption;
  isSelected: boolean;
  onClick: () => void;
};

const LanguageItem = ({ option, isSelected, onClick }: LanguageItemProps) => {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={onClick}
      className={clsx("w-full text-center flex flex-col")}
    >
      <span
        className={clsx(
          "Body_3_medium",
          isSelected ? "text-Grey-100" : "text-Grey-300 hover:text-Grey-100",
        )}
      >
        {option.label}
      </span>
      <span className="Caption_medium -mt-[0.125rem] text-Grey-300">
        {option.subLabel}
      </span>
    </button>
  );
};
export default LanguageItem;
