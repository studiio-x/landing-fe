import { useSearchParams } from "next/navigation";
import InvitedUserItem from "./InvitedUserItem";
import { useState } from "react";
import ModalOverlay from "@/components/common/ModalOverlay";
import { useTranslations } from "next-intl";
import { postInviteFolderParams } from "@/types/api/project.type";
import {
  useGetInvitedFolders,
  useInviteFolder,
} from "@/hooks/queries/useProject";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteModal = ({ isOpen, onClose }: InviteModalProps) => {
  const [inviteEmail, setInviteEmail] = useState("");
  const t = useTranslations("inviteModal");
  const searchParams = useSearchParams();
  const rootFolderId = searchParams.get("folderId");

  const { mutate: inviteFolder, isPending } = useInviteFolder();
  const { data } = useGetInvitedFolders(Number(rootFolderId), isOpen);

  const userName =
    useSearchParams().get("shared") || useSearchParams().get("not-shared");

  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    inviteEmail,
  );

  const handleInvite = ({ folderId, email }: postInviteFolderParams) => {
    inviteFolder(
      { folderId, email },
      {
        onSuccess: (data) => {
          console.log("Folder invited:", data);
          onClose();
        },
        onError: (error) => {
          console.error("Failed to invite folder:", error);
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={onClose}>
      <div className="bg-[rgba(40,44,52,0.90)] backdrop-blur-[5px] p-[1.25rem_1.5rem_2.25rem_1.5rem] rounded-[0.50019rem]">
        <h1 className="Body_2_semibold text-Grey-50 py-1 pl-2 mb-2">
          {t("title", { user: userName ?? "" })}
        </h1>

        <div className="flex flex-col items-start gap-14 relative self-stretch w-full flex-[0_0_auto] ">
          <div className="flex flex-col items-start pt-2 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto] mt-[-0.50px] mb-[-0.50px] ml-[-0.50px] mr-[-0.50px] border-t border-Grey-500 ">
            {data?.managers.map((user) => (
              <InvitedUserItem key={user.userId} {...user} />
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 pl-2">
          <h1 className="Body_3_semibold">{t("inviteByEmail")}</h1>
          <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
            <div className="w-[386px] flex flex-col items-start gap-2.5 px-4 py-3 relative bg-Grey-900 rounded">
              <input
                type="email"
                id="invite-email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                required
                className="peer w-full relative flex items-center justify-center mt-[-1.00px] placeholder:text-Grey-400 bg-transparent Body_2_medium"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                handleInvite({
                  folderId: Number(rootFolderId),
                  email: inviteEmail,
                })
              }
              disabled={!isValidEmail}
              className="group inline-flex items-center justify-center gap-2.5 py-3 px-6 relative flex-[0_0_auto] bg-opacitywhite-3 rounded-md border-[none] border-color-greyscale-grey-800 before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-md before:[background:linear-gradient(180deg,rgba(241,244,248,0.25)_0%,rgba(29,32,37,0.25)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none disabled:pointer-events-none hover:focus:ring-Red-400 hover:before:[background:linear-gradient(180deg,rgba(255,134,134,0.25)_0%,rgba(255,48,48,0.25)_100%)] transition-all duration-1000"
            >
              <span
                className={`relative flex items-end justify-center w-fit mt-[-1.00px] Caption_semibold group-hover:text-Red-400 ${!isValidEmail ? "text-Grey-500" : "text-Grey-50"}`}
              >
                {isPending ? t("inviting") : t("inviteButton")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default InviteModal;
