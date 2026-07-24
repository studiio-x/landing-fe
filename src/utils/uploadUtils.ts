export const uploadBlobToPresignedUrl = async (
  sourceUrl: string,
  uploadUrl: string,
  objectKey: string,
  contentType?: string,
): Promise<string> => {
  const sourceResponse = await fetch(sourceUrl);
  if (!sourceResponse.ok) {
    throw new Error("Failed to fetch source image");
  }
  const blob = await sourceResponse.blob();

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    body: blob,
    headers: { "Content-Type": contentType ?? blob.type },
  });
  if (!uploadResponse.ok) {
    throw new Error("Failed to upload image");
  }

  return objectKey;
};
