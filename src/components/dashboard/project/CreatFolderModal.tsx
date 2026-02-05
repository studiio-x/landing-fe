import { useState } from "react";
import { Close } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";
import clsx from "clsx";
import InvitedUserItem from "./InvitedUserItem";
import { MOCK_DATA_USERS } from "@/constants/dashboard/project/user";

interface CreatFolderModalProps {
  onClose: () => void;
}
export const CreatFolderModal = ({ onClose }: CreatFolderModalProps) => {
  const [folderName, setFolderName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInvite = () => {
    console.log("Inviting:", inviteEmail);
  };

  const handleCreate = () => {
    console.log("Creating folder:", folderName);
  };

  return (
    <div className="inline-flex flex-col items-start gap-2.5 pt-0 pb-9 px-0 relative bg-[#272b33e6] rounded-[var(--border-radius-radius-8)]">
      <div className="flex flex-col items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
        <header className="flex items-start justify-between pl-7 pr-5 pt-6 pb-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex items-center justify-center gap-2.5 pl-4 pr-0 pt-1 pb-0 relative flex-[0_0_auto]">
            <h1 className="relative w-fit mt-[-1.00px]  text-center whitespace-nowrap Subhead_1_semibold">
              폴더 생성하기
            </h1>
          </div>

          <button type="button" aria-label="닫기" className="cursor-pointer">
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
                  폴더 이름
                </label>

                <div className="self-stretch w-full flex-[0_0_auto] flex flex-col items-start gap-2.5 px-4 py-3 relative bg-Grey-900 rounded">
                  <input
                    type="text"
                    id="folder-name"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="제목없는 폴더"
                    className="w-full relative flex items-center justify-center mt-[-1.00px] Body_2_medium  placeholder:text-Grey-400 bg-transparent"
                  />
                </div>
              </div>

              <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                    <label
                      htmlFor="invite-email"
                      className="mt-[-1.00px] Body_2_semibold text-Grey-200 "
                    >
                      이메일로 초대하기
                    </label>

                    <span className="Body_3_regular text-Grey-300">(선택)</span>
                  </div>

                  <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                    <div className="w-[386px] flex flex-col items-start gap-2.5 px-4 py-3 relative bg-Grey-900 rounded">
                      <input
                        type="email"
                        id="invite-email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="이메일을 입력해 주세요"
                        className="w-full relative flex items-center justify-center mt-[-1.00px] placeholder:text-Grey-400 bg-transparent Body_2_medium"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleInvite}
                      className="group inline-flex items-center justify-center gap-2.5 py-3 px-6 relative flex-[0_0_auto] bg-opacitywhite-3 rounded-md border-[none] border-color-greyscale-grey-800 before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-md before:[background:linear-gradient(180deg,rgba(241,244,248,0.25)_0%,rgba(29,32,37,0.25)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none hover:focus:ring-Red-400 hover:before:[background:linear-gradient(180deg,rgba(255,134,134,0.25)_0%,rgba(255,48,48,0.25)_100%)] transition-all duration-1000"
                    >
                      <span
                        className={clsx(
                          "relative flex items-end justify-center w-fit mt-[-1.00px] Caption_semibold group-hover:text-Red-400",
                          inviteEmail.trim() === ""
                            ? "text-Grey-500"
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
                "w-full flex items-center justify-center gap-2.5 px-0 py-3 relative  hover:bg-[rgba(255,48,48,0.75)] flex-1 grow h-[2.9375rem]rounded Body_2_semibold ",
                folderName.trim() === "" || inviteEmail.trim() === ""
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
  );
};

export default CreatFolderModal;
