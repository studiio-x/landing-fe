"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { CreateFolder, Down, Up } from "@/assets/icons";
import Header from "@/components/dashboard/Header";
import SideBar from "@/components/dashboard/SideBar/SideBar";
import { useEffect, useRef, useState } from "react";
import FolderItem from "@/components/dashboard/project/FolderItem";
import GlassButton from "@/components/common/GlassButton";
import DropDown from "@/components/common/DropDown";
import useClickOutside from "@/hooks/useClickOutside";
import CreatFolderModal from "@/components/dashboard/project/CreatFolderModal";
import DeleteModal from "@/components/dashboard/project/DeleteModal";
import ModalOverlay from "@/components/common/ModalOverlay";
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
      {createModalOpen && (
        <ModalOverlay onClose={() => setCreateModalOpen(false)}>
          <CreatFolderModal onClose={() => setCreateModalOpen(false)} />
        </ModalOverlay>
      )}
      {/* 제거 모달 */}
      {deleteModalOpen && (
        <ModalOverlay onClose={() => setDeleteModalOpen(false)}>
          <DeleteModal
            setIsOpen={setDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
          />
        </ModalOverlay>
      )}

      {/* 초대 모달 */}
      {inviteModalOpen && (
        <ModalOverlay onClose={() => setInviteModalOpen(false)}>
          <InviteModal />
        </ModalOverlay>
      )}

      <Header />

      <div className="flex">
        <SideBar />
        <div className="mt-[3.25rem] px-16 w-full">
          <div className="w-full flex items-center gap-4">
            <h1 className="Heading_1_bold bg-gradient-to-b from-Red-300 to-Red-500 bg-clip-text text-transparent  ">
              프로젝트
            </h1>
            <div className="flex gap-[0.25rem]">
              <span className="whitespace-nowrap Body_2_medium text-Grey-200">
                {sharedProjectFromQuery}의 프로젝트
              </span>
              <button onClick={() => setInviteModalOpen(true)}>
                {inviteModalOpen ? (
                  <Up
                    className="w-[1.5rem] h-[1.5rem] cursor-"
                    color="#A9B4C6"
                  />
                ) : (
                  <Down className="w-[1.5rem] h-[1.5rem]" color="#A9B4C6" />
                )}
              </button>
            </div>
            <div className="flex ml-auto gap-3">
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
          <section className="grid grid-cols-3 w-full gap-[2.25rem] mt-8">
            {mockData.map((lists, index) => (
              <FolderItem
                lists={lists}
                index={index}
                key={index}
                setRenameModalOpen={setRenameModalOpen}
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
