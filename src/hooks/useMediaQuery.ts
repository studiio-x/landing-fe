"use client";

import { useEffect, useState } from "react";

export const useMediaQuery = (maxWidth: number) => {
  const [isMatch, setIsMatch] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth - 1}px)`);
    setIsMatch(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMatch(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [maxWidth]);

  return isMatch;
};
