"use client";

import { Close, Search } from "@/assets/icons";
import { useCallback, useEffect, useRef, useState } from "react";

interface SearchBarProps {
  isSearching: boolean;
  setIsSearching: (next: boolean) => void;
  onSearch: (keyword: string) => void;
}

const DEBOUNCE_MS = 300;

const SearchBar = ({
  isSearching,
  setIsSearching,
  onSearch,
}: SearchBarProps) => {
  const [keyword, setKeyword] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleClose = useCallback(() => {
    setKeyword("");
    setIsSearching(false);
  }, [setIsSearching]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedKeyword = keyword.trim();
      if (!trimmedKeyword) return;

      clearTimer();
      onSearch(trimmedKeyword);
    },
    [keyword, clearTimer, onSearch]
  );

  useEffect(() => {
    if (!isSearching || !keyword.trim()) return;

    clearTimer();
    timerRef.current = setTimeout(() => {
      onSearch(keyword.trim());
    }, DEBOUNCE_MS);

    return clearTimer;
  }, [keyword, isSearching, onSearch, clearTimer]);

  useEffect(() => {
    if (!isSearching) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearching, handleClose]);

  if (isSearching) {
    return (
      <form
        className="flex items-center justify-between w-full gap-3 bg-Grey-900 rounded-[0.625rem] pl-4 pr-[1.12rem] py-3 mb-5"
        onSubmit={handleSubmit}
      >
        <div className="relative flex-1">
          <input
            autoFocus
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="카테고리 검색"
            className="w-full pl-6 pr-3 py-2 rounded bg-Grey-800 Body_2_medium text-Grey-200 placeholder:text-Grey-500 outline-none"
          />
          <button type="submit" aria-label="검색">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-Grey-200" />
          </button>
        </div>

        <button type="button" onClick={handleClose} aria-label="닫기">
          <Close className="w-6 h-6 text-Grey-300" />
        </button>
      </form>
    );
  }

  return (
    <div className="flex justify-between w-full items-center px-2 mb-2">
      <span className="Body_2_medium text-Grey-400">추천</span>
      <button
        type="button"
        onClick={() => setIsSearching(true)}
        className="p-2 rounded-full bg-Grey-700 ml-auto"
        aria-label="검색 열기"
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchBar;
