"use client";

import { useSearchParams } from "next/navigation";

import Header from "@/components/dashboard/Header";
import Workbench from "@/components/dashboard/workbench/Workbench";
import type { WorkbenchMode } from "@/types/dashboard/mode.type";

const WorkbenchPage = () => {
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") as WorkbenchMode) ?? "studio";

  return (
    <div className="flex min-h-dvh flex-col w-full relative">
      <Header back tab={mode !== "video"} video />
      <div className="fixed rounded-full opacity-15 -z-10 w-[97.4375rem] h-[97.4375rem] -right-[48.71875rem] -bottom-[48.71875rem] blur-[1.5625rem] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,48,48,0.50)_0%,rgba(153,29,29,0.00)_100%)]" />
      <main className="flex justify-center mt-[2.81rem]">
        <Workbench mode={mode} />
      </main>
    </div>
  );
};

export default WorkbenchPage;
