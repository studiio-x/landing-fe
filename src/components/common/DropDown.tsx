import { Down, Up } from "@/assets/icons";
import clsx from "clsx";
import { pre } from "framer-motion/client";
import { Dispatch } from "react";

const ARRAY_OPTIONS = ["최신순", "오래된순"];
const AUTH_OPTIONS = [
  {
    name: "전체허용",
    description: "편집 및 다른 사람과 공유 허용",
  },
  {
    name: "편집허용",
    description: "편집 허용, 다른 사람과 공유 불가",
  },
  {
    name: "읽기전용",
    description: "편집 및 다른 사람과 공유 불가",
  },
];
const LANG_OPTIONS = [
  {
    name: "한국어",
    description: "Korean",
  },
  {
    name: "영어",
    description: "English",
  },
];

interface DropDownProps extends React.HTMLAttributes<HTMLDivElement> {
  ref: React.Ref<HTMLDivElement>;
  type: "array" | "auth" | "lang";
  currentState: string;
  setCurrentState: Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

const DropDown = ({
  ref,
  type = "array",
  currentState,
  setCurrentState,
  isOpen,
  setIsOpen,
  ...props
}: DropDownProps) => {
  return (
    <div {...props} ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          "flex items-center w-28 justify-center transition-colors duration-300",
          (type === "array" || type === "auth") &&
            "Body_2_medium  p-[0.5rem_0.65rem_0.5rem_1.25rem]",
          type === "lang" && "Caption_medium",
          type === "array" &&
            "bg-[rgba(255,255,255,0.05)] rounded-[5rem] gap-[0.25rem]",
          type === "auth" && "",
          type === "lang" && "bg-[rgba(255,255,255,0.1)] rounded-[0.25rem]",
          isOpen ? "text-Grey-400" : "text-Grey-200",
        )}
      >
        <span>{currentState}</span>
        <div>
          {isOpen ? <Up className="w-5 h-5" /> : <Down className="w-5 h-5" />}
        </div>
      </button>
      {isOpen && (
        <div
          className={clsx(
            "absolute z-10 mt-2 w-full bg-[rgba(255,255,255,0.15)] p-[0.5rem_0.75rem]",
            type === "array" && "rounded-[0.5rem] ",
            type === "auth" && "rounded-[0.25rem]",
            type === "lang" && "rounded-[0.25rem]",
          )}
        >
          <ul
            className={clsx(type === "array" && "gap-[0.5rem] flex flex-col")}
          >
            {(type === "array"
              ? ARRAY_OPTIONS
              : type === "auth"
                ? AUTH_OPTIONS
                : LANG_OPTIONS
            ).map((option) => (
              <li
                key={typeof option === "string" ? option : option.name}
                className={clsx(
                  "text-center",
                  (type === "auth" || type === "lang") &&
                    "border-b border-Grey-500 last:border-b-0 p-3",
                )}
              >
                <div
                  onClick={() =>
                    setCurrentState(
                      typeof option === "string" ? option : option.name,
                    )
                  }
                  className={clsx(
                    " text-Grey-300",
                    currentState ===
                      (typeof option === "string" ? option : option.name)
                      ? "text-Grey-100"
                      : type === "array"
                        ? "text-Grey-400"
                        : "text-Grey-300",
                    (type === "array" || type === "lang") && "Body_3_medium ",
                    type === "auth" && "Caption_semibold",
                  )}
                >
                  {typeof option === "string" ? option : option.name}
                </div>
                {typeof option !== "string" && (
                  <div className="text-Grey-300 Caption_medium">
                    {option.description}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
