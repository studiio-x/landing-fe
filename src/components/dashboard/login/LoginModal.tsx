"use client";

import { Google, Logo } from "@/assets/icons";
import LoginInput from "./LoginInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GlassButton from "@/components/common/GlassButton";
import clsx from "clsx";

export default function Login() {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const router = useRouter();

  const onClick = () => {
    setIsPasswordOpen(!isPasswordOpen);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email") setEmailValue(e.target.value.trim());
    else setPasswordValue(e.target.value.trim());
  };

  return (
    <div className="max-w-[28.75rem] pt-10 pb-12 px-[3.25rem] border-[1.5px] rounded-[0.5rem] border-[rgba(255,48,48,0.35)] bg-Grey-900 shadow-[0_0_8px_0_rgba(255,82,82,0.10),0_0_20px_0_rgba(8,8,8,0.12)] relative gap-[2.5rem] flex flex-col z-100">
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
            onChange={onChange}
          />
          <LoginInput
            placeholder="비밀번호"
            ariaLabel="비밀번호"
            watchIcon={true}
            isPasswordOpen={isPasswordOpen}
            onClick={onClick}
            onChange={onChange}
          />
          <GlassButton
            type="submit"
            className={clsx(
              "mt-10 w-full rounded-[4px] Body_2_semibold py-[0.78125rem] hover:bg-[rgba(255,48,48,0.75)] active:bg-[rgba(255,48,48,0.75)] text-white",
              emailValue != "" && passwordValue != ""
                ? "bg-[rgba(255,48,48,0.45)]"
                : "rgba(53,59,69,0.45) text-Grey-500"
            )}
            fullWidth={true}
          >
            로그인
          </GlassButton>
          <div className="text-center flex flex-col gap-[0.5rem]">
            <button className="Body_3_medium text-Grey-200 underline">
              비밀번호를 잊으셨나요?
            </button>
            <button
              className="flex gap-2 justify-center"
              onClick={() => router.push("/signup")}
            >
              <span className="Body_3_regular text-Grey-400">
                계정이 없으신가요?
              </span>
              <div className="Body_3_semibold text-Grey-200">회원가입</div>
            </button>
          </div>
        </form>
      </div>
      {/* 오버레이모달 넣기 */}
    </div>
  );
}
