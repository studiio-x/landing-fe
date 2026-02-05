import { useState } from "react";
import { Close, Down } from "@/assets/icons";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  permission: string;
}

const users: User[] = [
  {
    id: 1,
    name: "김류원",
    email: "cnkdnsjkn@ewhain.net",
    avatar: "/images/project/mockUserImg.png",
    permission: "전체 허용",
  },
  {
    id: 2,
    name: "박하경",
    email: "kcndnsjcksnd@g.hongik.ac.kr",
    avatar: "/images/project/mockUserImg.png",
    permission: "전체 허용",
  },
  {
    id: 3,
    name: "유지민",
    email: "laxmkxlowej@gmail.com",
    avatar: "/images/project/mockUserImg.png",
    permission: "전체 허용",
  },
  {
    id: 4,
    name: "송유선",
    email: "cnkd_sckdnsjkn@ewha.ac.kr",
    avatar: "/images/project/mockUserImg.png",
    permission: "전체 허용",
  },
];

export const CreatFolderModal = () => {
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
            <h1 className="relative w-fit mt-[-1.00px] font-heading-subhead-subhead-1-semibold font-[number:var(--heading-subhead-subhead-1-semibold-font-weight)] text-color-greyscale-white text-[length:var(--heading-subhead-subhead-1-semibold-font-size)] text-center tracking-[var(--heading-subhead-subhead-1-semibold-letter-spacing)] leading-[var(--heading-subhead-subhead-1-semibold-line-height)] whitespace-nowrap [font-style:var(--heading-subhead-subhead-1-semibold-font-style)]">
              폴더 생성하기
            </h1>
          </div>

          <button type="button" aria-label="닫기" className="cursor-pointer">
            <Close className="!relative !w-6 !h-6 !aspect-[1]" />
          </button>
        </header>

        <div className="inline-flex flex-col items-center gap-6 px-11 py-0 relative flex-[0_0_auto]">
          <div className="relative self-stretch w-full h-px mt-[-1.00px] object-cover" />

          <div className="inline-flex flex-col items-start gap-10 relative flex-[0_0_auto]">
            <div className="inline-flex flex-col items-start gap-6 relative flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                <label
                  htmlFor="folder-name"
                  className="mt-[-1.00px] font-heading-body-body-2-semibold font-[number:var(--heading-body-body-2-semibold-font-weight)] text-color-greyscale-grey-200 text-[length:var(--heading-body-body-2-semibold-font-size)] tracking-[var(--heading-body-body-2-semibold-letter-spacing)] leading-[var(--heading-body-body-2-semibold-line-height)] relative w-fit whitespace-nowrap [font-style:var(--heading-body-body-2-semibold-font-style)]"
                >
                  폴더 이름
                </label>

                <div className="self-stretch w-full flex-[0_0_auto] flex flex-col items-start gap-2.5 px-4 py-3 relative bg-color-greyscale-grey-900 rounded">
                  <input
                    type="text"
                    id="folder-name"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="제목없는 폴더"
                    className="w-full relative flex items-center justify-center mt-[-1.00px] font-heading-body-body-2-medium font-[number:var(--heading-body-body-2-medium-font-weight)] text-color-greyscale-grey-400 text-[length:var(--heading-body-body-2-medium-font-size)] tracking-[var(--heading-body-body-2-medium-letter-spacing)] leading-[var(--heading-body-body-2-medium-line-height)] [font-style:var(--heading-body-body-2-medium-font-style)] placeholder:text-color-greyscale-grey-400"
                  />
                </div>
              </div>

              <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                    <label
                      htmlFor="invite-email"
                      className="mt-[-1.00px] font-heading-body-body-2-semibold font-[number:var(--heading-body-body-2-semibold-font-weight)] text-color-greyscale-grey-200 text-[length:var(--heading-body-body-2-semibold-font-size)] tracking-[var(--heading-body-body-2-semibold-letter-spacing)] leading-[var(--heading-body-body-2-semibold-line-height)] relative w-fit whitespace-nowrap [font-style:var(--heading-body-body-2-semibold-font-style)]"
                    >
                      이메일로 초대하기
                    </label>

                    <span className="font-heading-body-body-3-regular font-[number:var(--heading-body-body-3-regular-font-weight)] text-color-greyscale-grey-300 text-[length:var(--heading-body-body-3-regular-font-size)] tracking-[var(--heading-body-body-3-regular-letter-spacing)] leading-[var(--heading-body-body-3-regular-line-height)] relative w-fit whitespace-nowrap [font-style:var(--heading-body-body-3-regular-font-style)]">
                      (선택)
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                    <div className="w-[386px] flex flex-col items-start gap-2.5 px-4 py-3 relative bg-color-greyscale-grey-900 rounded">
                      <input
                        type="email"
                        id="invite-email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="이메일을 입력해 주세요"
                        className="w-full relative flex items-center justify-center mt-[-1.00px] font-heading-body-body-2-medium font-[number:var(--heading-body-body-2-medium-font-weight)] text-color-greyscale-grey-400 text-[length:var(--heading-body-body-2-medium-font-size)] tracking-[var(--heading-body-body-2-medium-letter-spacing)] leading-[var(--heading-body-body-2-medium-line-height)] [font-style:var(--heading-body-body-2-medium-font-style)] placeholder:text-color-greyscale-grey-400"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleInvite}
                      className="inline-flex items-center justify-center gap-2.5 pt-[var(--spacing-spacing-12)] pr-[var(--spacing-spacing-24)] pb-[var(--spacing-spacing-12)] pl-[var(--spacing-spacing-24)] relative flex-[0_0_auto] bg-opacitywhite-3 rounded-md border-[none] border-color-greyscale-grey-800 before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-md before:[background:linear-gradient(180deg,rgba(241,244,248,0.25)_0%,rgba(29,32,37,0.25)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none cursor-pointer"
                    >
                      <span className="relative flex items-end justify-center w-fit mt-[-1.00px] font-heading-caption-caption-semibold font-[number:var(--heading-caption-caption-semibold-font-weight)] text-color-greyscale-grey-500 text-[length:var(--heading-caption-caption-semibold-font-size)] tracking-[var(--heading-caption-caption-semibold-letter-spacing)] leading-[var(--heading-caption-caption-semibold-line-height)] whitespace-nowrap [font-style:var(--heading-caption-caption-semibold-font-style)]">
                        초대하기
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-14 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex flex-col items-start pt-2 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto] mt-[-0.50px] mb-[-0.50px] ml-[-0.50px] mr-[-0.50px] border-t [border-top-style:solid] border-color-greyscale-grey-500">
                    {users.map((user, index) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]"
                      >
                        <div className="flex w-[352px] items-start gap-2 pl-2 pr-0 py-1.5 relative">
                          <img
                            className="relative w-6 h-6 object-cover rounded-full"
                            alt={`${user.name} 프로필`}
                            src={user.avatar}
                          />

                          <div className="inline-flex flex-col items-start justify-center relative flex-[0_0_auto]">
                            <div className="mt-[-1.00px] font-heading-body-body-3-medium font-[number:var(--heading-body-body-3-medium-font-weight)] text-color-greyscale-grey-100 text-[length:var(--heading-body-body-3-medium-font-size)] tracking-[var(--heading-body-body-3-medium-letter-spacing)] leading-[var(--heading-body-body-3-medium-line-height)] relative w-fit whitespace-nowrap [font-style:var(--heading-body-body-3-medium-font-style)]">
                              {user.name}
                            </div>

                            <div className="relative w-fit font-heading-caption-caption-medium font-[number:var(--heading-caption-caption-medium-font-weight)] text-color-greyscale-grey-300 text-[length:var(--heading-caption-caption-medium-font-size)] tracking-[var(--heading-caption-caption-medium-letter-spacing)] leading-[var(--heading-caption-caption-medium-line-height)] whitespace-nowrap [font-style:var(--heading-caption-caption-medium-font-style)]">
                              {user.email}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          aria-label={`${user.name} 권한 변경`}
                          className="inline-flex items-center gap-3 pt-[var(--border-radius-radius-8)] pb-[var(--border-radius-radius-8)] pl-[var(--border-radius-radius-20)] pr-3 relative flex-[0_0_auto] rounded-[var(--border-radius-radius-4)] cursor-pointer"
                        >
                          <span className="flex items-end justify-center font-heading-caption-caption-medium font-[number:var(--heading-caption-caption-medium-font-weight)] text-color-greyscale-grey-200 text-[length:var(--heading-caption-caption-medium-font-size)] tracking-[var(--heading-caption-caption-medium-letter-spacing)] leading-[var(--heading-caption-caption-medium-line-height)] relative w-fit whitespace-nowrap [font-style:var(--heading-caption-caption-medium-font-style)]">
                            {user.permission}
                          </span>

                          <div className="flex w-5 h-5 items-center justify-center gap-[8.33px] relative rotate-90">
                            <div className="inline-flex flex-col items-center justify-center relative flex-[0_0_auto]">
                              <Down />
                            </div>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCreate}
              className="flex h-12 items-center justify-center gap-2.5 px-0 py-2 relative self-stretch w-full bg-[#ff2f2f73] rounded backdrop-blur-[11.5px] backdrop-brightness-[100.0%] backdrop-saturate-[88.0%] [-webkit-backdrop-filter:blur(11.5px)_brightness(100.0%)_saturate(88.0%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_7px_rgba(0,0,0,0.05),inset_-1px_0_7px_rgba(0,0,0,0.04)] cursor-pointer"
            >
              <span className="flex items-end justify-center font-heading-body-body-2-semibold font-[number:var(--heading-body-body-2-semibold-font-weight)] text-color-greyscale-white text-[length:var(--heading-body-body-2-semibold-font-size)] tracking-[var(--heading-body-body-2-semibold-letter-spacing)] leading-[var(--heading-body-body-2-semibold-line-height)] relative w-fit whitespace-nowrap [font-style:var(--heading-body-body-2-semibold-font-style)]">
                생성하기
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatFolderModal;
