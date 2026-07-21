import { useState } from "react";
import { Close } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";
import ModalOverlay from "@/components/common/ModalOverlay";
import clsx from "clsx";
import InvitedUserItem from "./InvitedUserItem";
import { MOCK_DATA_USERS } from "@/mocks/dashboard/user.mock";

interface CreatFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const CreatFolderModal = ({ isOpen, onClose }: CreatFolderModalProps) => {
  const [folderName, setFolderName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [isFolderNameFocused, setIsFolderNameFocused] = useState(false);
  const [isInviteEmailFocused, setIsInviteEmailFocused] = useState(false);

  const handleInvite = () => {
    console.log("Inviting:", inviteEmail);
  };

  const handleCreate = () => {
    console.log("Creating folder:", folderName);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={onClose}>
      <div className="inline-flex flex-col items-start gap-2.5 pt-0 pb-9 px-0 relative bg-[#272b33e6] rounded-8">
        <div className="flex flex-col items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
          <header className="flex items-start justify-between pl-7 pr-5 pt-6 pb-0 relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-2.5 pl-4 pr-0 pt-1 pb-0 relative flex-[0_0_auto]">
              <h1 className="relative w-fit mt-px  text-center whitespace-nowrap Subhead_1_semibold">
                폴더 생성하기
              </h1>
            </div>

            <button type="button" aria-label="닫기" className="cursor-pointer">
              <Close
                className="relative! w-6! h-6! aspect-[1]! text-Grey-300"
                onClick={onClose}
              />
            </button>
          </header>

          <div className="inline-flex flex-col items-center gap-6 px-11 py-0 relative flex-[0_0_auto]">
            <div className="w-full h-px bg-Grey-600" />

            <div className="inline-flex flex-col items-start gap-10 relative flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start gap-6 relative flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                  <label
                    htmlFor="folder-name"
                    className="-mt-px Body_2_semibold text-Grey-200 "
                  >
                    폴더 이름
                  </label>

                  <div className="self-stretch w-full flex-[0_0_auto] relative rounded p-px bg-linear-to-b from-[rgba(255,48,48,0.45)] to-[rgba(255,48,48,0.15)]">
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
                      placeholder="제목없는 폴더"
                      className="w-full relative z-10 px-4 py-3 Body_2_medium placeholder:text-Grey-400 bg-Grey-900 rounded"
                    />
                  </div>
                </div>

                <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
                  <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
                    <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                      <label
                        htmlFor="invite-email"
                        className="-mt-px Body_2_semibold text-Grey-200"
                      >
                        이메일로 초대하기
                      </label>

                      <span className="Body_3_regular text-Grey-300">
                        (선택)
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                      <div className="w-96.5 relative rounded p-px bg-linear-to-b from-[rgba(255,48,48,0.45)] to-[rgba(255,48,48,0.15)]">
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
                          placeholder="이메일을 입력해 주세요"
                          className="w-full relative z-10 px-4 py-3 placeholder:text-Grey-400 bg-Grey-900 rounded Body_2_medium"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleInvite}
                        className="group inline-flex items-center justify-center gap-2.5 py-3 px-6 relative flex-[0_0_auto] h-10.25 bg-[rgba(255,255,255,0.03)] rounded-md border-[none] border-color-greyscale-grey-800 before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-md before:[background:linear-gradient(180deg,rgba(241,244,248,0.25)_0%,rgba(29,32,37,0.25)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:mask-exclude] before:z-1 before:pointer-events-none hover:before:[background:linear-gradient(to_bottom,rgba(255,134,134,0.25)_0%,rgba(255,48,48,0.25)_100%)] transition-colors duration-1000"
                      >
                        <span
                          className={clsx(
                            "relative flex items-end justify-center w-fit -mt-px Caption_semibold group-hover:text-Red-400",
                            inviteEmail.trim() === ""
                              ? "text-Grey-600"
                              : "text-Grey-50",
                          )}
                        >
                          초대하기
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-14 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="flex flex-col items-start pt-2 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto] mt-[-0.50px] mb-[-0.50px] ml-[-0.50px] mr-[-0.50px] border-t border-Grey-500 ">
                      {MOCK_DATA_USERS.map((user, index) => (
                        <InvitedUserItem key={index} user={user} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <GlassButton
                onClick={handleCreate}
                className={clsx(
                  "w-full flex items-center justify-center gap-2.5 px-0 py-3 relative  hover:bg-[rgba(255,48,48,0.75)] flex-1 grow h-11.75 rounded Body_2_semibold ",
                  folderName.trim() === ""
                    ? "pointer-events-none text-Grey-500 bg-[rgba(53,59,69,0.45)]"
                    : "text-Grey-50 bg-[rgba(255,48,48,0.45)]",
                )}
                type="button"
                aria-label="생성하기"
              >
                생성하기
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default CreatFolderModal;
