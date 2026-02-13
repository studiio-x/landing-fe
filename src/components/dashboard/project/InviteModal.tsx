import { useSearchParams } from "next/navigation";
import InvitedUserItem from "./InvitedUserItem";
import { MOCK_DATA_USERS } from "@/constants/dashboard/project/user";
import { useState } from "react";
import clsx from "clsx";
import ModalOverlay from "@/components/common/ModalOverlay";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteModal = ({ isOpen, onClose }: InviteModalProps) => {
  const userName = useSearchParams().get("shared");
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInvite = () => {
    console.log("Inviting:", inviteEmail);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={onClose}>
    <div className="bg-[rgba(40,44,52,0.90)] backdrop-blur-[5px] p-[1.25rem_1.5rem_2.25rem_1.5rem] rounded-[0.50019rem]">
      <h1 className="Body_2_semibold text-Grey-50 py-1 pl-2 mb-2">
        {userName}
        <span className="font-normal">의 프로젝트</span>
      </h1>

      <div className="flex flex-col items-start gap-14 relative self-stretch w-full flex-[0_0_auto] ">
        <div className="flex flex-col items-start pt-2 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto] mt-[-0.50px] mb-[-0.50px] ml-[-0.50px] mr-[-0.50px] border-t border-Grey-500 ">
          {MOCK_DATA_USERS.map((user, index) => (
            <InvitedUserItem key={index} user={user} />
          ))}
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-2 pl-2">
        <h1 className="Body_3_semibold">이메일로 초대하기</h1>
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
                inviteEmail.trim() === "" ? "text-Grey-500" : "text-Grey-50",
              )}
            >
              초대하기
            </span>
          </button>
        </div>
      </div>
    </div>
    </ModalOverlay>
  );
};

export default InviteModal;
