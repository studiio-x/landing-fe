"use client";

import { useState } from "react";
import { Close, Search } from "@/assets/icons";

const SearchBar = () => {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="flex items-center w-full">
      {isSearching ? (
        <div className="flex items-center justify-between w-full gap-3 bg-Grey-900 rounded-[0.625rem] pl-4 pr-[1.12rem] py-3">
          <div className="relative flex-1">
            <input
              autoFocus
              placeholder="카테고리 검색"
              className="w-full pl-6 pr-3 py-2 rounded bg-Grey-800 Body_2_medium text-Grey-200 placeholder:text-Grey-500 outline-none"
            />
            <button>
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-Grey-200" />
            </button>
          </div>

          <button onClick={() => setIsSearching(false)}>
            <Close className="w-6 h-6 text-Grey-300" />
          </button>
        </div>
      ) : (
        <div className="flex justify-between w-full items-center px-2">
          <span className="Body_2_medium text-Grey-400">추천</span>
          <button
            onClick={() => setIsSearching(true)}
            className="p-2 rounded-full bg-Grey-700 ml-auto"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
