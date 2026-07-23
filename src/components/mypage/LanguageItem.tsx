import { LanguageOption } from "@/types/mypage/language.type";
import clsx from "clsx";

interface LanguageItemProps {
  option: LanguageOption;
  isSelected: boolean;
  onClick: () => void;
}

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
      <span className="Caption_medium -mt-0.5 text-Grey-300">
        {option.subLabel}
      </span>
    </button>
  );
};
export default LanguageItem;
