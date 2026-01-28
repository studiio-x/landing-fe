"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Down } from "@/assets/icons";
import Header from "@/components/dashboard/Header";
import SideBar from "@/components/dashboard/SideBar/SideBar";
import { useEffect } from "react";
import FolderItem from "@/components/dashboard/project/FolderItem";

const mockData = [
  {
    name: "Handbag",
    isFolder: true,
    imageUrl: [1, 2, 3, 4, 5, 6].map((_) => "/images/project/mockData.png"),
  },
  {
    name: "Cosmetics Visuals",
    isFolder: true,
    imageUrl: [
      "/images/project/mockData.png",
      "/images/landing/product1.png",
      "/images/landing/product2.png",
      "/images/landing/product3.png",
      "/images/landing/product4.png",
      "/images/landing/product5.png",
    ],
  },
  {
    name: "Cosmetics Visuals",
    isFolder: true,
    imageUrl: [1, 2, 3, 4, 5, 6].map((_) => "/images/project/mockData.png"),
  },
  {
    name: "제목을 입력해주세요",
    isFolder: false,
    imageUrl: "/images/project/mockData.png",
  },
  {
    name: "제목을 입력해주세요",
    isFolder: false,
    imageUrl: "/images/project/mockData.png",
  },
];
const ProjectPage = () => {
  const searchParams = useSearchParams();
  const sharedProjectFromQuery = searchParams.get("shared");
  const router = useRouter();

  useEffect(() => {
    if (!sharedProjectFromQuery) {
      router.replace("/dashboard/project?shared=my");
    }
  }, []);

  return (
    <main className="relative min-h-screen w-full flex flex-col">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/images/dashboard/background.png')] bg-cover bg-center"
          style={{
            transform: "scaleX(-1) scale(2)",
            transformOrigin: "center",
          }}
        />
      </div>
      <Header />

      <div className="flex">
        <SideBar />
        <div className="mt-[3.25rem] px-16 w-full">
          <div className="w-full flex pr-[2.125rem] items-center gap-4">
            <h1 className="Heading_1_bold bg-gradient-to-b from-Red-300 to-Red-500 bg-clip-text text-transparent  ">
              프로젝트
            </h1>
            <div className="flex gap-[0.25rem]">
              <span className="whitespace-nowrap Body_2_medium text-Grey-200">
                {sharedProjectFromQuery}의 프로젝트
              </span>
              <Down className="w-[1.5rem] h-[1.5rem]" color="#A9B4C6" />
            </div>
          </div>
          <section className="grid grid-cols-3 w-full gap-[2.25rem] mt-8">
            {mockData.map((lists, index) => (
              <FolderItem lists={lists} index={index} key={index} />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};
export default ProjectPage;
