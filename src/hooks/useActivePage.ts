import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function useActivePage<T extends Record<string, string>>(
  config: T
): keyof T | undefined {
  const pathname = usePathname();

  return useMemo(() => {
    // locale을 제거한 경로로 비교 (예: /ko/dashboard -> /dashboard)
    const pathnameWithoutLocale = pathname.replace(/^\/(ko|en)/, "");
    const entry = Object.entries(config).find(
      ([_, path]) => pathnameWithoutLocale === path
    );
    return entry?.[0] as keyof T | undefined;
  }, [pathname, config]);
}
