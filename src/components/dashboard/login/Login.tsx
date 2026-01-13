"use client";

import { Google, Logo } from "@/assets/icons";
import LoginInput from "./LoginInput";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <div className="max-w-[28.75rem] pt-10 pb-12 px-[3.25rem] border-[1.5px] rounded-[0.5rem] border-[rgba(255,48,48,0.35)] bg-Grey-900 shadow-[0_0_8px_0_rgba(255,82,82,0.10),0_0_20px_0_rgba(8,8,8,0.12)] relative gap-[2.5rem] flex flex-col">
      <div className="flex items-center gap-[0.88rem]">
        <Logo className="w-[7.2rem] h-[2.875rem]" />
        <span className="Heading_3_semibold text-Grey-50">로그인하기</span>
      </div>

      <div className="flex flex-col gap-[1.75rem]">
        <button
          type="button"
          className="bg-Grey-700 rounded-[0.25rem] flex py-[0.75rem] px-[6.53rem] items-center gap-[0.75rem]"
        >
          <Google className="w-[1.75rem] h-[1.75rem]" />
          <span className="">구글로 계속하기</span>
        </button>

        <div className="w-full flex gap-[0.75rem] items-center">
          <div className="flex-1 bg-Grey-600 w-full h-[0.0625rem]"></div>
          <div className="text-Grey-400 Body_1_medium ">또는</div>
          <div className="flex-1 bg-Grey-600 w-full h-[0.0625rem]"></div>
        </div>

        <form action="" className="flex flex-col gap-[0.75rem]">
          <LoginInput
            placeholder="이메일 주소"
            ariaLabel="이메일"
            watch={true}
          />
          <LoginInput placeholder="비밀번호" ariaLabel="비밀번호" />
          {/* glass button 넣기 */}
          <div className="text-center flex flex-col gap-[0.5rem]">
            <button className="Body_3_medium text-Grey-200 underline">
              비밀번호를 잊으셨나요?
            </button>
            <div className="flex gap-2 justify-center">
              <span className="Body_3_regular text-Grey-400">
                계정이 없으신가요?
              </span>
              <button
                className="Body_3_semibold text-Grey-200"
                onClick={() => router.push("/signup")}
              >
                회원가입
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* 오버레이모달 넣기 */}
    </div>
  );
}
