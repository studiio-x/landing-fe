import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function useActivePage<T extends Record<string, string>>(
  config: T
): keyof T | undefined {
  const pathname = usePathname();

  return useMemo(() => {
    const entry = Object.entries(config).find(([_, path]) => pathname === path);
    return entry?.[0] as keyof T | undefined;
  }, [pathname, config]);
}
