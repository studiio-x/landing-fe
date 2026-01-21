"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Down, FolderBack, FolderFront } from "@/assets/icons";
import Header from "@/components/dashboard/Header";
import SideBar from "@/components/dashboard/SideBar/SideBar";
import Image from "next/image";
import { useEffect } from "react";

const mockData = [
  {
    name: "Handbag",
    imageUrl: [1, 2, 3, 4].map((_) => "/images/project/mockData.png"),
  },
  {
    name: "Cosmetics Visuals",
    imageUrl: [1, 2, 3, 4].map((_) => "/images/project/mockData.png"),
  },
  {
    name: "Cosmetics Visuals",
    imageUrl: [1, 2, 3, 4].map((_) => "/images/project/mockData.png"),
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
            {mockData.map((folder, index) => (
              <div key={index} className="relative">
                <FolderBack className="w-[17.4375rem]" />
                <span className="absolute bottom-5 Body_1_semibold z-10 left-1/2 -translate-x-1/2">
                  {folder.name}
                </span>
                <div className="top-8 absolute flex ml-[3.13rem]">
                  {folder.imageUrl.map((image, index) => (
                    <Image
                      src={image}
                      key={index}
                      alt="폴더이미지"
                      width={92}
                      height={92}
                      className={`${index % 2 === 0 ? "mt-[1.06rem]" : ""} -ml-[2.19rem] w-[5.75rem] h-[5.75rem]`}
                    />
                  ))}
                </div>
                <FolderFront className="max-w-[19.375rem] absolute bottom-0 x-5 backdrop-blur-sm overflow-clip" />
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};
export default ProjectPage;
