"use client";
import { Checkbox, LogoRed, SelectedCheckbox } from "@/assets/icons";
import Header from "@/components/landing/Header";
import { useState } from "react";

const SignUp = () => {
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false);

  return (
    <div className="flex h-full">
      {/* 헤더추가 */}
      {/* 좌측 영상 */}
      <section className="flex-[56%] h-full relative flex justify-center items-center">
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
      <section className="flex-[44%] pb-[5.75rem] flex flex-col justify-center h-full px-[8.5rem]">
        <div className="Heading_1_semibold text-Grey-50 mb-10">회원가입</div>
        <form>
          <input
            type="text"
            placeholder="이메일을 입력해주세요"
            className="bg-Grey-800 py-3 px-4 mb-4 placeholder:text-Grey-400 text-Grey-100 text-Body_2_medium w-full rounded-[4px]"
          />
          <button
            type="button"
            className="flex items-center  gap-3 pl-4 cursor-pointer"
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
          <button
            type="submit"
            className="mt-10 w-full bg-[rgba(255,48,48,0.45)] rounded-[4px] Body_2_semibold py-[0.78125rem]"
          >
            등록하기
          </button>
        </form>
        <div className="mt-3 flex gap-2 justify-center">
          <span className="Body_3_regular text-Grey-400">
            이미 계정이 있나요?
          </span>
          <button className="Body_3_semibold text-Grey-200">로그인하기</button>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
