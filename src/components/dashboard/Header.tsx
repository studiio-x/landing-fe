"use client";
import { Back, Logo, Person, Video } from "@/assets/icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HeaderProps {
  back?: boolean;
  tap?: boolean;
  video?: boolean;
}

const tapList = ["스튜디오", "모델"];

const Header = ({ back = false, tap = false, video = false }: HeaderProps) => {
  const [page, setPage] = useState("스튜디오");
  const router = useRouter();
  const pathnname = usePathname();

  useEffect(() => {
    if (pathnname === "/dashboard/studio") {
      setPage("스튜디오");
    } else if (pathnname === "/dashboard/model") {
      setPage("모델");
    }
  }, []);

  const togglePage = () => {
    setPage((prevPage) => (prevPage === "스튜디오" ? "모델" : "스튜디오"));
    page === "studio"
      ? router.push("/dashboard/studio")
      : router.push("/dashboard/model");
  };

  return (
    <header className="px-[6.125rem] pt-5 py-3 flex">
      <div className="flex gap-4 items-center">
        {back && <Back className="w-[1.5625rem] h-[1.5625rem] " />}
        <Logo className="w-[5.3125rem]" />
      </div>

      {/* 탭  */}
      <div className="flex-1 flex justify-center">
        {tap && (
          <div className=" rounded-[100px] bg-Grey-800  px-1 py-[2px]">
            <div>
              {tapList.map((item, index) => (
                <span
                  key={index}
                  onClick={togglePage}
                  className={`px-4 py-[2px] rounded-[100px] Body_2_medium transition-all duration-300 ease-in-out ${page == item ? "bg-Grey-600 text-Grey-50" : "text-Grey-500"}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-10 items-center">
        {/* 사용방법 */}
        {video && (
          <div className="flex gap-1 items-center">
            <Video className="w-7 h-7" />
            <span className="Body_1_medium text-Grey-400">사용방법</span>
          </div>
        )}
        <Person className="w-[1.16875rem] h-[1.16875rem]" />
      </div>
    </header>
  );
};

export default Header;
