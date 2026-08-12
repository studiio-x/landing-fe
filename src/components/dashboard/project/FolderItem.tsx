import { Folder, Meatball, NotFolder } from "@/assets/icons";
import Image from "next/image";
import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
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
  onClick?: () => void;
}

const FolderItem = ({ lists, index, setDeleteModalOpen, onClick }: FolderItemProps) => {
  const t = useTranslations("dashboard.project.folderItem");
  const [isOpenMeatball, setIsOpenMeatball] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [name, setName] = useState<string>(lists.name);
  const [rename, setRename] = useState<string>(name);
  const renameModalRef = useRef<HTMLTextAreaElement>(null);
  const meatballRef = useRef<HTMLDivElement>(null);
  const lastValidValue = useRef<string>(name);
  useClickOutside(meatballRef, () => setIsOpenMeatball(false), isOpenMeatball);

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
      setRename(newValue);
      target.style.height = `${currentScrollHeight}px`;
    } else {
      target.value = lastValidValue.current;
      setRename(lastValidValue.current);
      target.style.height = `${lineHeight * 4}px`;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setName(rename);
      setRenameModalOpen(false);
    }
  };

  useEffect(() => {
    if (renameModalOpen) {
      lastValidValue.current = rename;
      const textarea = renameModalRef.current;
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      }
      setIsOpenMeatball(false);
    }
    adjustTextareaHeight();
  }, [renameModalOpen, adjustTextareaHeight]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [name, rename, adjustTextareaHeight]);

  return (
    <div key={index} className="relative w-77 cursor-pointer" onClick={onClick}>
      {lists.isFolder ? (
        <Folder className="w-77 h-50" />
      ) : (
        <NotFolder className="w-77 h-50" />
      )}

      {lists.isFolder && (
        <span
          className={
            "text-base top-[0.44rem] text-Grey-100 font-normal font-calSans absolute  left-4"
          }
        >
          {t("folderLabel")} {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <div
        className={`${lists.isFolder ? "flex top-10.25 gap-4 w-fit" : "w-73 h-[calc(100%-0.875rem)] top-[0.44rem]"} left-2 absolute`}
      >
        {lists.isFolder ? (
          <div
            className="grid gap-0.5"
            style={{
              gridTemplateColumns: "49px 49px 49px",
              gridTemplateRows: "49px 49px 49px",
            }}
          >
            {(lists.imageUrl as string[]).length === 0 ? (
              <div className="col-span-3 row-span-3 w-full h-full rounded-xs bg-Grey-700 flex items-center justify-center">
                <span className="Body_3_medium text-Grey-500">
                  {t("noImage")}
                </span>
              </div>
            ) : (
              (lists.imageUrl as string[]).filter(Boolean).map((image, idx) => (
                <Image
                  src={image}
                  key={idx}
                  alt={t("folderThumbnailAlt")}
                  width={92}
                  height={92}
                  className={clsx("w-full h-full object-cover rounded-xs", {
                    "col-span-2 row-span-2": idx === 0,
                  })}
                />
              ))
            )}
          </div>
        ) : (
          <div className="w-full h-full relative">
            {lists.imageUrl && (
              <Image
                src={lists.imageUrl as string}
                alt={t("projectThumbnailAlt")}
                width={292}
                height={292}
                className="object-cover w-73 h-full"
              />
            )}
          </div>
        )}

        <div
          className={`${lists.isFolder ? "w-31 relative" : "w-73 bg-linear-to-b from-Grey-900/70 to-Grey-800/70 absolute bottom-0 left-0 backdrop-blur-lg pt-1.5 pl-2 gap-1"} flex flex-col text-Grey-50 `}
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
                onBlur={() => {
                  setName(rename);
                  setRenameModalOpen(false);
                }}
                onKeyDown={onKeyDown}
              />
            </div>

            <div
              className={`relative h-6 self-end ${lists.isFolder ? "" : "mb-1.5"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpenMeatball(!isOpenMeatball)}
                aria-label={t("moreOptions")}
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
