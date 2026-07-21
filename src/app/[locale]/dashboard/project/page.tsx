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
import CreatFolderModal from "@/components/dashboard/project/CreatFolderModal";
import AlertModal from "@/components/common/AlertModal";
import InviteModal from "@/components/dashboard/project/InviteModal";

const mockData = [
  {
    name: "Handbag",
    isFolder: true,
    imageUrl: [1, 2, 3, 4, 5, 6].map((_) => "/images/project/mockData.png"),
  },
  {
    name: "Cosmetics Visuals",
    isFolder: true,
    imageUrl: [
      "/images/project/mockData.png",
      "/images/landing/product1.png",
      "/images/landing/product2.png",
      "/images/landing/product3.png",
      "/images/landing/product4.png",
      "/images/landing/product5.png",
    ],
  },
  {
    name: "Cosmetics Visuals",
    isFolder: true,
    imageUrl: [1, 2, 3, 4, 5, 6].map((_) => "/images/project/mockData.png"),
  },
  {
    name: "제목을 입력해주세요",
    isFolder: false,
    imageUrl: "/images/project/mockData.png",
  },
  {
    name: "제목을 입력해주세요",
    isFolder: false,
    imageUrl: "/images/project/mockData.png",
  },
];

const ProjectPage = () => {
  const searchParams = useSearchParams();
  const sharedProjectFromQuery = searchParams.get("shared");
  const router = useRouter();
  const [array, setArray] = useState("최신순");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sharedProjectFromQuery) {
      router.replace("/dashboard/project?shared=my");
    }
  }, []);

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

  // 폴더와 프로젝트에 분리된 인덱스 부여
  const itemsWithIndex = useMemo(() => {
    let folderCount = 0;
    let projectCount = 0;

    return mockData.map((item, originalIndex) => ({
      ...item,
      displayIndex: item.isFolder ? folderCount++ : projectCount++,
      originalIndex,
    }));
  }, [mockData]);

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
      <CreatFolderModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      {/* 제거 모달 */}
      <AlertModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="정말 삭제하시겠습니까?"
        description="폴더를 삭제하면 하위의 폴더와 프로젝트가 모두 삭제되며, 복구할 수 없습니다."
        buttons={[
          {
            label: "닫기",
            variant: "default",
            onClick: () => setDeleteModalOpen(false),
          },
          {
            label: "삭제하기",
            variant: "red",
            onClick: () => setDeleteModalOpen(false),
          },
        ]}
      />

      {/* 초대 모달 */}
      <InviteModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />

      <Header />

      <div className="flex">
        <SideBar />
        <div className="mt-13 flex items-center flex-col flex-1 w-249 mr-4.5">
          <div className="w-249 flex items-center gap-4">
            <h1 className="Heading_1_bold bg-linear-to-b from-Red-300 to-Red-500 bg-clip-text text-transparent  ">
              프로젝트
            </h1>
            <div className="flex gap-1">
              <span className="whitespace-nowrap Body_2_medium text-Grey-200">
                {sharedProjectFromQuery ?? ""}의 프로젝트
              </span>
              <button onClick={() => setInviteModalOpen(true)}>
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
            {itemsWithIndex.map((item) => (
              <FolderItem
                lists={item}
                index={item.displayIndex}
                key={item.originalIndex}
                setDeleteModalOpen={setDeleteModalOpen}
              />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};
export default ProjectPage;
