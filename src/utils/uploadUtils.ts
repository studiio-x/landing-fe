export const uploadBlobToPresignedUrl = async (
  sourceUrl: string,
  uploadUrl: string,
  objectKey: string,
  contentType?: string,
): Promise<string> => {
  const blob = await fetch(sourceUrl).then((r) => r.blob());
  await fetch(uploadUrl, {
    method: "PUT",
    body: blob,
    headers: { "Content-Type": contentType ?? blob.type },
  });
  return objectKey;
};
