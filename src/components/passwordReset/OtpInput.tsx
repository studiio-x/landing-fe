"use client";

import { useRef, useState, useCallback } from "react";
import clsx from "clsx";

interface OtpInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
}

const OtpInput = ({ length, value, onChange, ariaLabel }: OtpInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const digits = value.split("").concat(Array(length - value.length).fill(""));
  const activeIndex = Math.min(value.length, length - 1);

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  const handleChange = (index: number, char: string) => {
    if (!/^\d?$/.test(char)) return;

    const newDigits = [...digits];
    newDigits[index] = char;
    const newValue = newDigits.join("").slice(0, length);
    onChange(newValue);

    if (char && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (pasted) {
      onChange(pasted);
      focusInput(Math.min(pasted.length, length - 1));
    }
  };

  return (
    <div className="flex gap-5 justify-between mx-[2px]" role="group" aria-label={ariaLabel}>
      {digits.slice(0, length).map((digit, index) => (
        <div
          key={index}
          className={clsx(
            "rounded p-[1px] flex-1",
            isFocused && activeIndex === index
              ? "bg-gradient-to-b from-[rgba(255,48,48,0.45)] to-[rgba(255,48,48,0.15)]"
              : "bg-transparent",
          )}
        >
          <input
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onPaste={index === 0 ? handlePaste : undefined}
            className={clsx(
              "bg-Grey-800 rounded text-center py-3 px-4 w-[2.625rem]",
              "text-Grey-100 Body_2_semibold",
              "focus:outline-none",
              "caret-transparent",
            )}
            aria-label={`${ariaLabel} ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default OtpInput;
