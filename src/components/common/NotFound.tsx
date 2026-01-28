"use client";

import Header from "@/components/dashboard/Header";
import GlassButton from "./GlassButton";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/common/paths";

const NotFound = () => {
    const router = useRouter();

  return (
    <main className="flex flex-col min-h-dvh">
      <Header />
      <div className="fixed inset-0 bg-[url('/images/dashboard/create-background.png')] bg-no-repeat bg-top [background-size:100%_auto] -z-10 pointer-events-none opacity-50" />

      <div className="flex flex-col items-center justify-center flex-1 pb-[7.8125rem]">
        <div className="py-2 px-5 bg-White/3 border border-Grey-700 rounded-[80px] text-Grey-100 mb-7">
          404 error
        </div>

        <div className="flex flex-col gap-5 text-center mb-[4.5rem]">
          <h1 className="Heading_1_bold text-White">오류가 발생했어요</h1>
          <p className="Subhead_2_medium text-Grey-300">
            주소가 잘못 입력되거나,
            <br />
            변경 혹은 삭제되어 페이지를 찾을 수 없어요.
          </p>
        </div>

        <GlassButton
          size="xl"
          variant="red"
          className="Body_2_semibold"
          onClick={() => router.push(PATHS.HOME)}
        >
          홈으로
        </GlassButton>
      </div>
    </main>
  );
};

export default NotFound;