import { useToastStore } from "@/stores/useToastStore";

// HEIC/HEIF는 브라우저에서 디코딩/미리보기가 안 되는 경우가 많아 업로드 단계에서부터 막는다.
const UNSUPPORTED_IMAGE_EXTENSIONS = [".heic", ".heif"];
const UNSUPPORTED_IMAGE_MIME_TYPES = [
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
];

export const isSupportedImageFile = (file: File): boolean => {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  const isHeic =
    UNSUPPORTED_IMAGE_EXTENSIONS.some((ext) => name.endsWith(ext)) ||
    UNSUPPORTED_IMAGE_MIME_TYPES.includes(type);

  if (isHeic) return false;

  return type.startsWith("image/");
};

export const acceptImageFile = (
  file: File,
  unsupportedFormatMessage: string,
): boolean => {
  if (isSupportedImageFile(file)) return true;

  useToastStore.getState().showToast(unsupportedFormatMessage);
  return false;
};
