import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getProfileUploadUrl, updateProfileImage } from "@/apis/mypageApi";
import { queryKeys } from "@/hooks/queries/queryKeys";

export const useProfileImageUpload = () => {
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);

  const uploadProfileImage = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      throw new Error("이미지 파일만 업로드 가능합니다.");
    }

    setIsUploading(true);

    try {
      const { uploadUrl, objectKey } = await getProfileUploadUrl();
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("파일 업로드 실패");
      }

      await updateProfileImage({ profileImage: objectKey });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.mypage.detail(),
      });

      return { success: true };
    } catch (error) {
      console.error("프로필 이미지 업데이트 실패:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadProfileImage,
    isUploading,
  };
};
