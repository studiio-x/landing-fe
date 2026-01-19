import { Down, FolderBack } from "@/assets/icons";
import Header from "@/components/dashboard/Header";
import SideBar from "@/components/dashboard/SideBar";
import Image from "next/image";

const mockData = [
  {
    name: "Makeup Campaign",
    imageUrl: [1, 2, 3, 4].map((_) => "public/images/project/mockData.png"),
  },
  {
    name: "Cosmetics Visuals",
    imageUrl: [1, 2, 3, 4].map((_) => "public/images/project/mockData.png"),
  },
];
const ProjectPage = () => {
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
                임셈의 프로젝트
              </span>
              <Down className="w-[1.5rem] h-[1.5rem]" color="#A9B4C6" />
            </div>
          </div>
          <section className="grid grid-cols-3 w-full gap-[2.25rem]">
            {mockData.map((folder, index) => (
              <FolderBack key={index}>
                {folder.name}
                {folder.imageUrl.map((image, index) => (
                  <Image
                    src={image}
                    key={index}
                    alt="폴더이미지"
                    width={5.75}
                    height={5.75}
                  />
                ))}
              </FolderBack>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};
export default ProjectPage;
