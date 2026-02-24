import { useState } from "react";
import { Close } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";
import ModalOverlay from "@/components/common/ModalOverlay";
import clsx from "clsx";
import InvitedUserItem from "./InvitedUserItem";
import { useTranslations } from "next-intl";
import {
  useGetInvitedFolders,
  useMakeFolder,
} from "@/hooks/queries/useProject";
import { useSearchParams } from "next/navigation";

interface CreatFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const CreatFolderModal = ({
  isOpen,
  onClose,
}: CreatFolderModalProps) => {
  const t = useTranslations("createFolder");
  const [folderName, setFolderName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [isFolderNameFocused, setIsFolderNameFocused] = useState(false);
  const [isInviteEmailFocused, setIsInviteEmailFocused] = useState(false);
  const searchParams = useSearchParams();
  const rootFolderId = searchParams.get("folderId");
  const { data } = useGetInvitedFolders(Number(rootFolderId), isOpen);

  const { mutate: createFolder, isPending } = useMakeFolder();

  const handleInvite = () => {
    console.log("Inviting:", inviteEmail);
  };

  const handleCreate = () => {
    createFolder(
      {
        rootFolderId: Number(rootFolderId),
        folderName: folderName,
      },
      {
        onSuccess: (data) => {
          console.log("Folder created:", data);
          onClose();
        },
        onError: (error) => {
          console.error("Failed to create folder:", error);
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={onClose}>
      <div className="inline-flex flex-col items-start gap-2.5 pt-0 pb-9 px-0 relative bg-[#272b33e6] rounded-[var(--border-radius-radius-8)]">
        <div className="flex flex-col items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
          <header className="flex items-start justify-between pl-7 pr-5 pt-6 pb-0 relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-2.5 pl-4 pr-0 pt-1 pb-0 relative flex-[0_0_auto]">
              <h1 className="relative w-fit mt-[-1.00px]  text-center whitespace-nowrap Subhead_1_semibold">
                {t("title")}
              </h1>
            </div>

            <button
              type="button"
              aria-label={t("closeLabel")}
              className="cursor-pointer"
            >
              <Close
                className="!relative !w-6 !h-6 !aspect-[1] text-Grey-300"
                onClick={onClose}
              />
            </button>
          </header>

          <div className="inline-flex flex-col items-center gap-6 px-11 py-0 relative flex-[0_0_auto]">
            <div className="w-full h-[0.0625rem] bg-Grey-600"></div>

            <div className="inline-flex flex-col items-start gap-10 relative flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start gap-6 relative flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                  <label
                    htmlFor="folder-name"
                    className="mt-[-1.00px] Body_2_semibold text-Grey-200 "
                  >
                    {t("folderNameLabel")}
                  </label>

                  <div className="self-stretch w-full flex-[0_0_auto] relative rounded p-[1px] bg-gradient-to-b from-[rgba(255,48,48,0.45)] to-[rgba(255,48,48,0.15)]">
                    <div
                      className={clsx(
                        "absolute inset-0 bg-Grey-900 rounded transition-opacity duration-200 ease-in-out",
                        isFolderNameFocused ? "opacity-0" : "opacity-100",
                      )}
                    />
                    <input
                      type="text"
                      id="folder-name"
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)}
                      onFocus={() => setIsFolderNameFocused(true)}
                      onBlur={() => setIsFolderNameFocused(false)}
                      placeholder={t("folderNamePlaceholder")}
                      className="w-full relative z-10 px-4 py-3 Body_2_medium placeholder:text-Grey-400 bg-Grey-900 rounded"
                    />
                  </div>
                </div>

                <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
                  <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
                    <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                      <label
                        htmlFor="invite-email"
                        className="mt-[-1.00px] Body_2_semibold text-Grey-200"
                      >
                        {t("inviteByEmail")}
                      </label>

                      <span className="Body_3_regular text-Grey-300">
                        ({t("optional")})
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                      <div className="w-[386px] relative rounded p-[1px] bg-gradient-to-b from-[rgba(255,48,48,0.45)] to-[rgba(255,48,48,0.15)]">
                        <div
                          className={clsx(
                            "absolute inset-0 bg-Grey-900 rounded transition-opacity duration-200 ease-in-out",
                            isInviteEmailFocused ? "opacity-0" : "opacity-100",
                          )}
                        />
                        <input
                          type="email"
                          id="invite-email"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          onFocus={() => setIsInviteEmailFocused(true)}
                          onBlur={() => setIsInviteEmailFocused(false)}
                          placeholder={t("emailPlaceholder")}
                          className="w-full relative z-10 px-4 py-3 placeholder:text-Grey-400 bg-Grey-900 rounded Body_2_medium"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleInvite}
                        className="group inline-flex items-center justify-center gap-2.5 py-3 px-6 relative flex-[0_0_auto] h-[2.5625rem] bg-[rgba(255,255,255,0.03)] rounded-md border-[none] border-color-greyscale-grey-800 before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-md before:[background:linear-gradient(180deg,rgba(241,244,248,0.25)_0%,rgba(29,32,37,0.25)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none hover:before:[background:linear-gradient(to_bottom,rgba(255,134,134,0.25)_0%,rgba(255,48,48,0.25)_100%)] transition-colors duration-1000"
                      >
                        <span
                          className={clsx(
                            "relative flex items-end justify-center w-fit mt-[-1.00px] Caption_semibold group-hover:text-Red-400",
                            inviteEmail.trim() === ""
                              ? "text-Grey-600"
                              : "text-Grey-50",
                          )}
                        >
                          {t("inviteButton")}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-14 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="flex flex-col items-start pt-2 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto] mt-[-0.50px] mb-[-0.50px] ml-[-0.50px] mr-[-0.50px] border-t border-Grey-500 ">
                      {data?.managers.map((user) => (
                        <InvitedUserItem key={user.userId} {...user} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <GlassButton
                onClick={handleCreate}
                className={clsx(
                  "w-full flex items-center justify-center gap-2.5 px-0 py-3 relative  hover:bg-[rgba(255,48,48,0.75)] flex-1 grow h-[2.9375rem] rounded Body_2_semibold ",
                  folderName.trim() === "" || isPending
                    ? "pointer-events-none text-Grey-500 bg-[rgba(53,59,69,0.45)]"
                    : "text-Grey-50 bg-[rgba(255,48,48,0.45)]",
                )}
                type="button"
                aria-label={t("createButton")}
                disabled={folderName.trim() === "" || isPending}
              >
                {isPending ? t("creating") : t("createButton")}
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default CreatFolderModal;
