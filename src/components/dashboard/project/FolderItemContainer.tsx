"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import FolderItem from "./FolderItem";
import { useGetFolderDetail } from "@/hooks/queries/useFolderApi";

interface FolderItemContainerProps {
  folderId: number;
  name: string;
  index: number;
  setDeleteModalOpen: (open: boolean) => void;
}

const FolderItemContainer = ({
  folderId,
  name,
  index,
  setDeleteModalOpen,
}: FolderItemContainerProps) => {
  const router = useRouter();
  const locale = useLocale();
  const { data } = useGetFolderDetail(folderId);
  const images = data?.folders[0]?.images ?? [];

  const handleClick = () => {
    router.push(`/${locale}/dashboard/workbench?mode=studio&folderId=${folderId}`);
  };

  return (
    <FolderItem
      lists={{ name, isFolder: true, imageUrl: images }}
      index={index}
      setDeleteModalOpen={setDeleteModalOpen}
      onClick={handleClick}
    />
  );
};

export default FolderItemContainer;
