import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function useActivePage<T extends Record<string, string>>(
  config: T
): keyof T | undefined {
  const pathname = usePathname();

  return useMemo(() => {
    const strippedPathname = "/" + pathname.split("/").slice(2).join("/");
    const entry = Object.entries(config).find(([_, path]) => strippedPathname === path);
    return entry?.[0] as keyof T | undefined;
  }, [pathname, config]);
}
