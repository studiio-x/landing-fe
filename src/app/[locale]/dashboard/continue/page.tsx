"use client";

import { Back } from "@/assets/icons";
import Header from "@/components/dashboard/Header";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AlertModal from "@/components/common/AlertModal";
import FolderItemContainer from "@/components/dashboard/project/FolderItemContainer";
import { useGetFolders } from "@/hooks/queries/useFolderApi";

const ContinuePage = () => {
  const router = useRouter();
  const t = useTranslations("dashboard");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { data: foldersData } = useGetFolders();
  const folders = [
    ...(foldersData?.myProject ?? []),
    ...(foldersData?.sharedProject ?? []),
  ];

  return (
    <div className="flex flex-col min-h-dvh relative">
      <div className="fixed inset-0 bg-[url('/images/dashboard/continue-background.png')]  bg-no-repeat bg-top bg-size-[100%_auto] -z-10 pointer-events-none" />
      <div className="fixed inset-0 bg-black/75 -z-10 pointer-events-none" />
      <Header />

      <button
        type="button"
        onClick={() => router.back()}
        aria-label={t("continue.backButtonLabel")}
        className="absolute left-[6.13rem] top-28"
      >
        <Back className="w-11 h-11" />
      </button>

      <main className="w-full flex flex-col items-center gap-18 flex-1 mt-13 mb-27">
        <div className="flex flex-col gap-3 items-center">
          <span className="py-2 px-5 border border-Grey-700 bg-[rgba(255,255,255,0.03)] Body_2_medium text-Grey-100 rounded-[5rem]">
            {t("continue.badge")}
          </span>
          <h1 className="Heading_1_bold text-White">{t("continue.title")}</h1>
        </div>

        <section aria-label={t("continue.badge")}>
          <ul className="grid grid-cols-3 gap-x-9 gap-y-11">
            {folders.map((folder, index) => (
              <li key={folder.folderId}>
                <FolderItemContainer
                  folderId={folder.folderId}
                  name={folder.name}
                  index={index}
                  setDeleteModalOpen={setDeleteModalOpen}
                />
              </li>
            ))}
          </ul>
        </section>
      </main>

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
    </div>
  );
};

export default ContinuePage;
