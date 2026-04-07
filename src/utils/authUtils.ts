export function getSafeCallbackDestination(
  callbackUrl: string | null,
  fallback: string,
): string {
  const isValid =
    callbackUrl !== null &&
    callbackUrl.startsWith("/") &&
    !callbackUrl.startsWith("//") &&
    !callbackUrl.includes(":");

  return isValid ? callbackUrl : fallback;
}
