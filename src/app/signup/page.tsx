"use client";
import { Checkbox, LogoRed, SelectedCheckbox } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";
import Header from "@/components/dashboard/Header";
import LoginInput from "@/components/dashboard/login/LoginInput";
import clsx from "clsx";

import { useState } from "react";

const SignUp = () => {
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {/* 좌측 영상 */}
        <section className="flex-[56%] relative flex justify-center items-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/landing/main-poster.png"
          >
            <source src="/videos/guide-optimized.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,8,8,0.80)] to-[rgba(8,8,8,0.45)]" />
          <LogoRed className=" z-50 w-[21rem] h-auto" />
        </section>

        {/* 우측 로그인 */}
        <section className="flex-[44%] pb-[5.75rem] flex flex-col justify-center px-[8.5rem]">
          <div className="Heading_1_semibold text-Grey-50 mb-10">회원가입</div>
          <form>
            <LoginInput
              placeholder="이메일을 입력해주세요"
              ariaLabel="이메일"
              onChange={onChange}
            />
            <button
              type="button"
              className="flex items-center  gap-3 pl-4 cursor-pointer mt-4"
              onClick={() => setIsCheckboxClicked((pre) => !pre)}
            >
              {isCheckboxClicked ? (
                <SelectedCheckbox className="w-6 h-6" />
              ) : (
                <Checkbox className="w-6 h-6" />
              )}

              <span className="Body_3_regular text-Grey-300">
                약관 및 개인정보 처리방침에 동의합니다.
              </span>
            </button>
            <GlassButton
              type="submit"
              className={clsx(
                "mt-10 w-full rounded-[4px] Body_2_semibold py-[0.78125rem] hover:bg-[rgba(255,48,48,0.75)] text-white",
                inputValue != "" && isCheckboxClicked
                  ? "bg-[rgba(255,48,48,0.45)]"
                  : "rgba(53,59,69,0.45) text-Grey-500"
              )}
              fullWidth={true}
            >
              등록하기
            </GlassButton>
          </form>
          <div className="mt-3 flex gap-2 justify-center">
            <span className="Body_3_regular text-Grey-400">
              이미 계정이 있나요?
            </span>
            <button className="Body_3_semibold text-Grey-200">
              로그인하기
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignUp;
