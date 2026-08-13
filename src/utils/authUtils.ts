export function getSafeCallbackDestination(
  callbackUrl: string | null,
  fallback: string,
): string {
  if (!callbackUrl) return fallback;

  try {
    const currentOrigin = window.location.origin;
    const resolved = new URL(callbackUrl, currentOrigin);

    if (resolved.origin !== currentOrigin) return fallback;

    return `${resolved.pathname}${resolved.search}${resolved.hash}`;
  } catch {
    return fallback;
  }
}
