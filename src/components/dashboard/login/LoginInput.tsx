import clsx from "clsx";
import { Watch, WatchOff } from "@/assets/icons";
import { useState } from "react";

interface LoginInputProps {
  placeholder: string;
  ariaLabel: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  isPasswordOpen?: boolean;
  watchIcon?: boolean;
}

const LoginInput = ({
  placeholder,
  ariaLabel,
  onChange,
  onClick,
  isPasswordOpen,
  watchIcon,
}: LoginInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <div className="rounded-[4px] p-[1px] bg-gradient-to-b from-[rgba(255,48,48,0.45)] to-[rgba(255,48,48,0.15)] relative">
        <div
          className={clsx(
            "absolute inset-0 bg-Grey-900 rounded-[4px] transition-opacity duration-200 ease-in-out",
            isFocused ? "opacity-0" : "opacity-100"
          )}
        />
        <input
          type={watchIcon ? (isPasswordOpen ? "text" : "password") : "text"}
          placeholder={placeholder}
          className="bg-Grey-800 py-3 px-4 placeholder:text-Grey-400 text-Grey-100 Body_2_medium w-full rounded-[4px] relative z-10"
          aria-label={ariaLabel}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={onChange}
        />
      </div>
      {watchIcon && (
        <button
          type="button"
          className="absolute right-4 top-[13px] z-20"
          aria-label="비밀번호 표시/숨김"
          onClick={onClick}
        >
          {isPasswordOpen ? (
            <Watch className="w-5 h-5" />
          ) : (
            <WatchOff className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
};

export default LoginInput;
