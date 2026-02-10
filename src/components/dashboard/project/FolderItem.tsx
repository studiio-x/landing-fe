import { Folder, Meatball, NotFolder } from "@/assets/icons";
import Image from "next/image";
import clsx from "clsx";
import { useRef, useState } from "react";
import MeatballModal from "./MeatballModal";
import useClickOutside from "@/hooks/useClickOutside";

interface FolderItemProps {
  lists: {
    name: string;
    isFolder: boolean;
    imageUrl: string | string[];
  };
  index: number;
  setRenameModalOpen: (open: boolean) => void;
  setDeleteModalOpen: (open: boolean) => void;
}

const FolderItem = ({
  lists,
  index,
  setRenameModalOpen,
  setDeleteModalOpen,
}: FolderItemProps) => {
  const [isOpenMeatball, setIsOpenMeatball] = useState(false);
  const meatballRef = useRef<HTMLDivElement>(null);
  useClickOutside(meatballRef, () => setIsOpenMeatball(false), isOpenMeatball);

  return (
    <div key={index} className="relative w-[19.25rem]">
      {lists.isFolder ? (
        <Folder className="w-[19.25rem] h-50" />
      ) : (
        <NotFolder className="w-[19.25rem] h-50" />
      )}

      {lists.isFolder && (
        <span
          className={
            "text-base top-[0.44rem] text-Grey-100 font-normal font-calSans absolute  left-4"
          }
        >
          Folder 0{index + 1}
        </span>
      )}

      <div
        className={`${lists.isFolder ? "flex top-[2.5625rem] gap-4 h-[calc(100%-3rem)] w-fit" : "w-[18.25rem] h-[calc(100%-0.95rem)] top-[0.44rem]"} left-[0.5rem] absolute`}
      >
        {lists.isFolder ? (
          <div
            className="grid gap-[0.125rem]"
            style={{
              gridTemplateColumns: "49px 49px 49px",
              gridTemplateRows: "49px 49px 49px",
            }}
          >
            {(lists.imageUrl as string[]).map((image, idx) => (
              <Image
                src={image}
                key={idx}
                alt="대시보드 이미지"
                width={92}
                height={92}
                className={clsx("w-full h-full object-cover rounded-[2px]", {
                  "col-span-2 row-span-2": idx === 0,
                })}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-full relative">
            <Image
              src={lists.imageUrl as string}
              alt="폴더이미지"
              width={292}
              height={292}
              className="object-cover w-[18.25rem] h-full"
            />
          </div>
        )}

        <div
          className={`${lists.isFolder ? "w-[7.75rem] relative" : "w-full bg-gradient-to-b from-[rgba(22,24,29,0.7)] to-[rgba(29,32,37,0.7)] absolute bottom-0 backdrop-blur-[16px] pt-[0.38rem] pl-[0.5rem] gap-[0.31rem]"} flex flex-col text-Grey-50 `}
        >
          {!lists.isFolder && (
            <span
              className={
                "text-[0.875rem] text-Grey-100 font-normal font-calSans opacity-100"
              }
            >
              Project 0{index + 1}
            </span>
          )}
          <div className={`flex-1 flex ${lists.isFolder ? "flex-col" : ""}`}>
            <span className="bottom-8 Body_1_medium z-10 flex-1 opacity-100">
              {lists.name}
            </span>

            <div className="relative self-end">
              <button
                onClick={() => setIsOpenMeatball(!isOpenMeatball)}
                aria-label="더보기"
              >
                <Meatball
                  className={`${isOpenMeatball ? "text-Grey-50" : "text-Grey-300"} w-6 h-6 transition-colors`}
                />
              </button>

              {isOpenMeatball && (
                <MeatballModal
                  meatballRef={meatballRef}
                  setRenameModalOpen={setRenameModalOpen}
                  setDeleteModalOpen={setDeleteModalOpen}
                  isFolder={lists.isFolder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderItem;
