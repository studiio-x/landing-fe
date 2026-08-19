"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import FolderItem from "./FolderItem";
import { useGetProjects } from "@/hooks/queries/useProjectApi";

interface FolderItemContainerProps {
  folderId: number;
  name: string;
  index: number;
  setDeleteTargetId: (folderId: number | null) => void;
}

const FolderItemContainer = ({
  folderId,
  name,
  index,
  setDeleteTargetId,
}: FolderItemContainerProps) => {
  const router = useRouter();
  const locale = useLocale();
  const { data } = useGetProjects(folderId, 0, 12);
  const images = (data?.folders ?? [])
    .slice(0, 6)
    .flatMap((f) => f.images)
    .slice(0, 6);

  return (
    <FolderItem
      lists={{ folderId, name, isFolder: true, imageUrl: images }}
      index={index}
      setDeleteTargetId={setDeleteTargetId}
    />
  );
};

export default FolderItemContainer;
