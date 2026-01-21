"use client";

import { Back } from "@/assets/icons";
import Header from "@/components/dashboard/Header";
import { useRouter } from "next/navigation";

const ContinuePage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen relative">
      <div className="fixed inset-0 bg-[url('/images/dashboard/continue-background.png')]  bg-no-repeat bg-top [background-size:100%_auto] -z-10 pointer-events-none" />
      <Header />

      <button
        type="button"
        onClick={() => router.back()}
        aria-label="이전 페이지로 이동"
        className="absolute left-[6.13rem] top-[7rem]"
      >
        <Back className="w-11 h-11" />
      </button>

      <main className="w-full flex flex-col items-center gap-[4.5rem] flex-1 justify-center mb-[6.75rem]">
        <div className="flex flex-col gap-3 items-center">
          <span className="py-2 px-5 border border-Grey-700 bg-[rgba(255,255,255,0.03)] Body_2_medium text-Grey-100 rounded-[5rem]">
            프로젝트 이어하기
          </span>
          <h1 className="Heading_1_bold text-White">
            원하는 작업을 선택해 주세요
          </h1>
        </div>

        <section aria-label="작업 선택">
          <ul className="flex items-center gap-9">
            {/* 폴더 디자인 확정 후 작업 */}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default ContinuePage;
