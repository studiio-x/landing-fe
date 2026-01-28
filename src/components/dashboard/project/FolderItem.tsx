import { Folder, Meatball, NotFolder } from "@/assets/icons";
import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";

interface FolderItemProps {
  lists: {
    name: string;
    isFolder: boolean;
    imageUrl: string | string[];
  };
  index: number;
}

const FolderItem = ({ lists, index }: FolderItemProps) => {
  const [isOpenMeatball, setIsOpenMeatball] = useState(false);

  return (
    <div key={index} className="relative">
      {lists.isFolder ? (
        <Folder className=" w-full h-full" />
      ) : (
        <NotFolder className="w-full h-full" />
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
        className={`${lists.isFolder ? "flex  top-[2.56rem] gap-4 w-[calc(100%-1rem)] h-[calc(100%-3rem)]" : " w-[calc(100%-1rem)] h-[calc(100%-0.95rem)] top-[0.44rem]"}  left-[0.5rem] right-[0.5rem]  absolute`}
      >
        {lists.isFolder ? (
          <div className="grid grid-cols-3 grid-rows-3 gap-[0.13rem] w-[52%]">
            {(lists.imageUrl as string[]).map((image, idx) => (
              <Image
                src={image}
                key={idx}
                alt="대시보드 이미지"
                width={92}
                height={92}
                className={clsx("w-full h-full object-cover", {
                  "col-span-2 row-span-2": idx === 0,
                })}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex-1 relative">
            <Image
              src={lists.imageUrl as string}
              alt="폴더이미지"
              fill
              className=" object-cover w-full h-full "
            />
          </div>
        )}

        <div
          className={`${lists.isFolder ? " relative" : " bg-gradient-to-b from-[rgba(22,24,29,0.7)] to-[rgba(29,32,37,0.7)] absolute bottom-0 backdrop-blur-[16px] pt-[0.38rem] pl-[0.5rem] gap-[0.31rem]"}  flex-1 flex flex-col w-full text-Grey-50 `}
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
          <div
            className={`${lists.isFolder ? "flex-1 flex flex-col" : "flex-1 flex "}`}
          >
            <span className="bottom-5 Body_1_medium z-10 flex-1 opacity-100">
              {lists.name}
            </span>
            <button
              className="self-end"
              onClick={() => setIsOpenMeatball(!isOpenMeatball)}
              aria-label="더보기"
            >
              <Meatball
                className={`${isOpenMeatball ? "text-Grey-50" : "text-Grey-300"} w-6 h-6 transition-colors`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderItem;
