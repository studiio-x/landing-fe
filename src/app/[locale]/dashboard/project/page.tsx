"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { CreateFolder, Down, Up } from "@/assets/icons";
import Header from "@/components/dashboard/Header";
import SideBar from "@/components/dashboard/sidebar/SideBar";
import { useEffect, useMemo, useRef, useState } from "react";
import FolderItem from "@/components/dashboard/project/FolderItem";
import GlassButton from "@/components/common/GlassButton";
import DropDown from "@/components/common/DropDown";
import useClickOutside from "@/hooks/useClickOutside";
import CreateFolderModal from "@/components/dashboard/project/CreateFolderModal";
import AlertModal from "@/components/common/AlertModal";
import InviteModal from "@/components/dashboard/project/InviteModal";
import { useTranslations } from "next-intl";
import {
  useDeleteFolder,
  useFolderDetail,
  useMoveFolder,
  useProject,
} from "@/hooks/queries/useProject";
import { useGetProjectsInFolder } from "@/hooks/queries/useProjectApi";
import { useMypage } from "@/hooks/queries/useMypageApi";

const ProjectPage = () => {
  const t = useTranslations("project");
  const { data } = useProject();
  const { data: userData } = useMypage();
  const { mutate: deleteFolder } = useDeleteFolder();
  const { mutate: moveFolder } = useMoveFolder();
  const searchParams = useSearchParams();
  const params = new URLSearchParams();
  const sharedProjectFromQuery =
    searchParams.get("shared") || searchParams.get("not-shared");
  const currentFolderId = Number(searchParams.get("folderId") || 0);
  const { data: folderDetailData } = useFolderDetail(currentFolderId);
  const { data: projectsData } = useGetProjectsInFolder(currentFolderId);
  const router = useRouter();
  const [array, setArray] = useState("newest");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isParentDragOver, setIsParentDragOver] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const targetUserId = userData?.userId || null;
  const rootFolderId = data?.myProject[0]?.folderId;
  const isInSubFolder = !!currentFolderId && currentFolderId !== rootFolderId;

  useEffect(() => {
    if (!sharedProjectFromQuery && data?.myProject.length) {
      params.set("not-shared", data.myProject[0].name);
      params.set("folderId", String(data.myProject[0].folderId));
      router.replace(`/dashboard/project?${params.toString()}`);
    }
  }, [sharedProjectFromQuery]);

  useClickOutside(dropDownRef, () => setIsDropDownOpen(false), isDropDownOpen);

  useEffect(() => {
    if (array) {
      setTimeout(() => {
        setIsDropDownOpen(false);
      }, 100);
    }
  }, [array]);

  const onCreatButtonClick = () => {
    setCreateModalOpen(true);
  };
  const onDelete = () => {
    if (!deleteTargetId) return;

    deleteFolder(deleteTargetId, {
      onSuccess: () => {
        console.log("폴더 삭제 성공:", deleteTargetId);
        setDeleteTargetId(null);
      },
      onError: (error) => {
        console.error("폴더 삭제 실패:", error);
        setDeleteTargetId(null);
      },
    });
  };

  const folderItems = useMemo(() => {
    if (!folderDetailData?.folders) return [];

    return folderDetailData.folders.map((folder, index) => ({
      folderId: folder.folderId,
      name: folder.folderName,
      isFolder: true,
      imageUrl: folder.images,
      displayIndex: index,
    }));
  }, [folderDetailData]);

  const projectItems = useMemo(() => {
    if (!projectsData?.projects) return [];

    return projectsData.projects.map((project, index) => ({
      folderId: project.projectId,
      name: project.title,
      isFolder: false,
      imageUrl: project.thumbnailObjectKey ?? "",
      displayIndex: index,
    }));
  }, [projectsData]);

  return (
    <main className="relative min-h-screen w-full flex flex-col">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/images/dashboard/background.png')] bg-cover bg-center"
          style={{
            transform: "scaleX(-1) scale(2)",
            transformOrigin: "center",
          }}
        />
      </div>

      {/* 폴더 생성 모달 */}
      <CreateFolderModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      {/* 제거 모달 */}
      <AlertModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        title="정말 삭제하시겠습니까?"
        description="폴더를 삭제하면 하위의 폴더와 프로젝트가 모두 삭제되며, 복구할 수 없습니다."
        buttons={[
          {
            label: "닫기",
            variant: "default",
            onClick: () => setDeleteTargetId(null),
          },
          {
            label: "삭제하기",
            variant: "red",
            onClick: onDelete,
          },
        ]}
      />

      {/* 초대 모달 */}
      <InviteModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        targetUserId={targetUserId}
      />

      <Header />

      <div className="flex">
        <SideBar />
        <div className="mt-13 flex items-center flex-col flex-1 w-249 mr-4.5">
          <div className="w-249 flex items-center gap-4">
            <h1 className="Heading_1_bold bg-linear-to-b from-Red-300 to-Red-500 bg-clip-text text-transparent  ">
              {t("title")}
            </h1>
            {isInSubFolder && (
              <div
                role="button"
                className={`Body_2_medium transition-colors rounded-lg px-3 py-1 border border-dashed cursor-pointer ${
                  isParentDragOver
                    ? "border-Red-400 bg-Red-400/10 text-white"
                    : "border-Grey-500 text-Grey-300 hover:border-Grey-400 hover:text-Grey-200"
                }`}
                onClick={() => {
                  const p = new URLSearchParams(searchParams.toString());
                  p.set("folderId", String(rootFolderId));
                  router.push(`/dashboard/project?${p.toString()}`);
                }}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsParentDragOver(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDragLeave={(e) => {
                  e.stopPropagation();
                  setIsParentDragOver(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsParentDragOver(false);
                  const draggedFolderId = Number(
                    e.dataTransfer.getData("draggedFolderId"),
                  );
                  if (draggedFolderId && rootFolderId) {
                    moveFolder({
                      folderId: draggedFolderId,
                      newFolderId: rootFolderId,
                    });
                  }
                }}
              >
                ← 상위 폴더로
              </div>
            )}
            <div className="flex gap-1">
              <span className="whitespace-nowrap Body_2_medium text-Grey-200">
                {t("subtitle", { user: sharedProjectFromQuery ?? "" })}
              </span>
              <button
                onClick={() => setInviteModalOpen(true)}
                aria-label="프로젝트 초대"
              >
                {inviteModalOpen ? (
                  <Up className="w-6 h-6" color="#A9B4C6" />
                ) : (
                  <Down className="w-6 h-6" color="#A9B4C6" />
                )}
              </button>
            </div>

            <div className="flex ml-auto gap-3 items-center self-end">
              <GlassButton
                onClick={onCreatButtonClick}
                type="button"
                className="rounded-full hover:bg-[rgba(255,48,48,0.35)] active:bg-[rgba(255,48,48,0.75)] backdrop-blur-sm"
                size="xs"
              >
                <CreateFolder className="w-6 h-6" />
              </GlassButton>

              <DropDown
                ref={dropDownRef}
                type="array"
                currentState={array}
                setCurrentState={setArray}
                isOpen={isDropDownOpen}
                setIsOpen={setIsDropDownOpen}
              />
            </div>
          </div>

          <section className="grid grid-cols-3  gap-x-9 gap-y-11 mt-8">
            {folderItems.map((item) => (
              <FolderItem
                lists={item}
                index={item.displayIndex}
                key={`folder-${item.folderId}`}
                setDeleteTargetId={setDeleteTargetId}
              />
            ))}
            {projectItems.map((item) => (
              <FolderItem
                lists={item}
                index={item.displayIndex}
                key={`project-${item.folderId}`}
                setDeleteTargetId={setDeleteTargetId}
              />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};
export default ProjectPage;
