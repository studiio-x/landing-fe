import { Down, Up } from "@/assets/icons";
import {
  ARRAY_OPTIONS,
  AUTH_OPTIONS,
  LANG_OPTIONS,
} from "@/constants/dashboard/project/dropdown-options";
import clsx from "clsx";
import { Dispatch } from "react";
import { useTranslations } from "next-intl";
import { Permission } from "@/types/api/project.type";
import { useUpdateUserPermission } from "@/hooks/queries/useProject";
import { useSearchParams } from "next/navigation";
import { useMypage } from "@/hooks/queries/useMypageApi";

interface DropDownProps extends React.HTMLAttributes<HTMLDivElement> {
  ref: React.Ref<HTMLDivElement>;
  type: "array" | "auth" | "lang";
  currentState: Permission | string;
  setCurrentState: Dispatch<React.SetStateAction<Permission | string>>;
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
  const searchParams = useSearchParams();
  const { data: userData, isLoading } = useMypage();
  const { mutate: updateUserPermission, isPending } = useUpdateUserPermission();
  const t = useTranslations("dropdown");

  if (isLoading || !userData) return null;

  const userId = userData.userId;
  const folderId = Number(searchParams.get("folderId"));

  const onOptionClick = (
    option: string | { key: string; description: string },
  ) => {
    const value = typeof option === "string" ? option : option.key;
    setCurrentState(value);
    setIsOpen(false);
    if (type === "auth" && folderId) {
      updateUserPermission(
        { userId, folderId, permission: value as Permission },
        {
          onSuccess: (data) => {
            console.log("Permission updated:", data);
            setIsOpen(false);
          },
          onError: (error) => {
            console.error("Failed to update permission:", error);
          },
        },
      );
    }
  };

  return (
    <div {...props} ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          "flex items-center gap-3 w-28 justify-center transition-colors duration-300",
          (type === "array" || type === "auth") &&
            "Body_2_medium  p-[0.5rem_0.65rem_0.5rem_1.25rem]",
          type === "lang" && "Caption_medium",
          type === "array" &&
            "bg-[rgba(255,255,255,0.05)] rounded-[5rem] gap-1",
          type === "auth" && "Caption_medium ",
          type === "lang" && "bg-[rgba(255,255,255,0.1)] rounded-4",
          isOpen ? "text-Grey-400" : "text-Grey-200",
        )}
      >
        <span className="whitespace-nowrap">
          {type === "array"
            ? t(`sort.${currentState}`)
            : type === "auth"
              ? t(`auth.${currentState}`)
              : t(`lang.${currentState}`)}
        </span>
        <div>
          {isOpen ? <Up className="w-5 h-5" /> : <Down className="w-5 h-5" />}
        </div>
      </button>
      {isOpen && (
        <div
          className={clsx(
            "absolute z-10 mt-2  bg-[rgba(255,255,255,0.15)] backdrop-blur-[10px] p-[0.5rem_0.75rem]",
            type === "array" && "rounded-[0.5rem] w-full",
            type === "auth" && "rounded-[0.25rem] right-0",
            type === "lang" && "rounded-[0.25rem] w-full",
          )}
        >
          <ul
            className={clsx(type === "array" && "gap-2 flex flex-col")}
          >
            {(type === "array"
              ? ARRAY_OPTIONS
              : type === "auth"
                ? AUTH_OPTIONS
                : LANG_OPTIONS
            ).map((option) => (
              <li
                key={typeof option === "string" ? option : option.key}
                className={clsx(
                  "text-center cursor-pointer",
                  (type === "auth" || type === "lang") &&
                    "border-b border-Grey-500 last:border-b-0 p-3",
                )}
                onClick={() => onOptionClick(option)}
              >
                <div
                  className={clsx(
                    currentState ===
                      (typeof option === "string" ? option : option.key)
                      ? "text-Grey-100"
                      : type === "array"
                        ? "text-Grey-400"
                        : "text-Grey-300",
                    (type === "array" || type === "lang") && "Body_3_medium ",
                    type === "auth" && "Caption_semibold",
                  )}
                >
                  {typeof option === "string"
                    ? t(`sort.${option}`)
                    : type === "auth"
                      ? t(`auth.${option.key}`)
                      : t(`lang.${option.key}`)}
                </div>
                {typeof option !== "string" && (
                  <div className="text-Grey-300 Caption_medium whitespace-nowrap">
                    {type === "auth"
                      ? t(`auth.${option.description}`)
                      : option.description}
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
