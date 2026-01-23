"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { Down } from "@/assets/icons";
import { LANGUAGE_OPTIONS } from "@/constants/mypage/tab";
import { LanguageOption, LanguageType } from "@/types/mypage/language";
import LanguageItem from "./LanguageItem";

type LanguageDropdownProps = {
  value: LanguageType;
  options?: LanguageOption[];
  onChange: (value: LanguageType) => void;
  className?: string;
};

const LanguageDropdown = ({
  value,
  options = LANGUAGE_OPTIONS,
  onChange,
  className,
}: LanguageDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selected = useMemo(
    () =>
      options.find((o) => o.value === value) ??
      options[0] ?? { value: value, label: "", subLabel: "" },
    [options, value],
  );

useEffect(() => {
  const onPointerDown = (e: PointerEvent) => {
    if (!wrapperRef.current) return;
    if (!wrapperRef.current.contains(e.target as Node)) setIsOpen(false);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
  };
  window.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("keydown", onKeyDown);
  return () => {
    window.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("keydown", onKeyDown);
  };
}, []);

  const handleSelect = (next: LanguageType) => {
    onChange(next);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={clsx("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-[6.8125rem] h-[2.4375rem] bg-White/10 rounded pl-5 pr-3 py-2 flex items-center justify-between"
      >
        <span
          className={clsx(
            "Body_2_medium",
            isOpen ? "text-Grey-400" : "text-Grey-200",
          )}
        >
          {selected.label}
        </span>

        <Down
          className={clsx(
            "w-5 h-5 transition-colors shrink-0",
            isOpen
              ? "rotate-180 [&_path]:fill-Grey-300"
              : "rotate-0 [&_path]:fill-Grey-400",
          )}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-[6.8125rem] rounded bg-White/15 p-3"
        >
          <div className="flex flex-col">
            {options.map((opt, idx) => {
              const isSelected = opt.value === selected.value;
              const isLast = idx === options.length - 1;

              return (
                <div key={opt.value}>
                  <LanguageItem
                    option={opt}
                    isSelected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                  />

                  {!isLast && <div className="my-2 h-px w-full bg-Grey-500" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
