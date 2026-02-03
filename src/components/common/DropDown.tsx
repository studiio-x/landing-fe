import { Down, Up } from "@/assets/icons";
import clsx from "clsx";
import { ReactNode } from "react";
import { text } from "stream/consumers";

const arrayOptions = ["최신순", "오래된순"];
const authOptions = [
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
const langOptions = [
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
  type: "array" | "auth" | "lang";
  currentState: ReactNode;
  setIscurrentState?: (state: ReactNode) => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const DropDown = ({
  type = "array",
  currentState,
  setIscurrentState,
  isOpen,
  setIsOpen,
  ...props
}: DropDownProps) => {
  return (
    <div {...props} className="relative">
      <div
        className={clsx(
          "flex items-center",
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
        <div>{isOpen ? <Up /> : <Down />}</div>
      </div>
      {isOpen && (
        <div
          className={clsx(
            "absolute z-10 mt-1 w-full  bg-[rgba(255,255,255,0.15)] p-[0.5rem_0.75rem]",
            type === "array" && "rounded-[0.5rem]",
            type === "auth" && "rounded-[0.25rem]",
            type === "lang" && "rounded-[0.25rem]",
          )}
        >
          <ul>
            {(type === "array"
              ? arrayOptions
              : type === "auth"
                ? authOptions
                : langOptions
            ).map((option) => (
              <li key={typeof option === "string" ? option : option.name}>
                <span>{typeof option === "string" ? option : option.name}</span>
                {typeof option !== "string" && (
                  <span
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
                    {option.description}
                  </span>
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
