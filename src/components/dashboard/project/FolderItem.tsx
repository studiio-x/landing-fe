import { Folder, Meatball, NotFolder } from "@/assets/icons";
import Image from "next/image";
import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MeatballModal from "./MeatballModal";
import useClickOutside from "@/hooks/useClickOutside";

interface FolderItemProps {
  lists: {
    name: string;
    isFolder: boolean;
    imageUrl: string | string[];
  };
  index: number;
  setDeleteModalOpen: (open: boolean) => void;
}

const FolderItem = ({ lists, index, setDeleteModalOpen }: FolderItemProps) => {
  const [isOpenMeatball, setIsOpenMeatball] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [name, setname] = useState<string>(lists.name);
  const [rename, setrename] = useState<string>(name);
  const renameModalRef = useRef<HTMLTextAreaElement>(null);
  const meatballRef = useRef<HTMLDivElement>(null);
  const lastValidValue = useRef<string>(name);
  useClickOutside(meatballRef, () => setIsOpenMeatball(false), isOpenMeatball);
  useClickOutside(
    renameModalRef,
    () => {
      setRenameModalOpen(false);
      setrename(name);
    },
    renameModalOpen,
  );

  const adjustTextareaHeight = useCallback(() => {
    const textarea = renameModalRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const style = window.getComputedStyle(textarea);
    const lineHeight = parseInt(style.lineHeight);
    const maxHeight = lineHeight * 4;
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, []);

  const onNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!renameModalOpen) return;

    const target = e.target;
    const newValue = target.value;

    target.style.height = "auto";

    const style = window.getComputedStyle(target);
    const lineHeight = parseInt(style.lineHeight);

    const currentScrollHeight = target.scrollHeight;
    const currentLines = Math.floor(currentScrollHeight / lineHeight);

    if (currentLines <= 4) {
      lastValidValue.current = newValue;
      setrename(newValue);
      target.style.height = `${currentScrollHeight}px`;
    } else {
      target.value = lastValidValue.current;
      setrename(lastValidValue.current);
      target.style.height = `${lineHeight * 4}px`;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setname(rename);
      setRenameModalOpen(false);
    }
  };

  useEffect(() => {
    if (renameModalOpen) {
      lastValidValue.current = rename;
      renameModalRef.current?.focus();
      setIsOpenMeatball(false);
    }
    adjustTextareaHeight();
  }, [renameModalOpen, adjustTextareaHeight]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [name, rename, adjustTextareaHeight]);

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
          Folder {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <div
        className={`${lists.isFolder ? "flex top-[2.5625rem] gap-4 w-fit" : "w-[18.25rem] h-[calc(100%-0.875rem)] top-[0.44rem]"} left-[0.5rem] absolute`}
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
          className={`${lists.isFolder ? "w-[7.75rem] relative" : "w-[18.25rem] bg-gradient-to-b from-Grey-900/70 to-Grey-800/70 absolute bottom-0 left-0 backdrop-blur-lg pt-1.5 pl-2 gap-1"} flex flex-col text-Grey-50 `}
        >
          {!lists.isFolder && (
            <span
              className={
                "text-[0.875rem] text-Grey-100 font-normal font-calSans opacity-100"
              }
            >
              Project {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <div className={`flex flex-1 ${lists.isFolder ? "flex-col" : ""}`}>
            <div className="flex-1">
              <textarea
                rows={1}
                aria-label="name"
                className="bottom-5 Body_1_medium opacity-100 bg-transparent leading-tight pt-0 pb-0 w-full resize-none overflow-hidden focus:outline-none "
                onChange={onNameChange}
                ref={renameModalRef}
                value={renameModalOpen ? rename : name}
                readOnly={!renameModalOpen}
                onBlur={() => setRenameModalOpen(false)}
                onKeyDown={onKeyDown}
              />
            </div>
            {/* h-6확인필요 */}
            <div
              className={`relative h-6 self-end ${lists.isFolder ? "" : "mb-1.5"}`}
            >
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
