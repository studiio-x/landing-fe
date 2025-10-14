import Link from "next/link";
import { Close, Logo, Menu } from "@/assets/icons";
import OpenBtn from "./OpenBtn";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="flex w-full justify-between 2xl:px-[6.12rem] lg:px-8 px-3 pt-4 pb-3 lg:pt-5 lg:pb-3">
        <div className="flex w-fit self-center">
          <Link href="/">
            <Logo className="mr-12 w-[5.3125rem] self-center" />
          </Link>
          <div className="Body_2_semibold gap-10 hidden lg:flex">
            <Link href="/guide">User Guide</Link>
            <Link href="/guide#reviews">User Review</Link>
            <Link href="/guide#contact">Contact Us</Link>
            <Link href="/price">Price</Link>
            <Link href="/#gallery">Gallery</Link>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="hidden sm:flex h-fit w-fit">
            <OpenBtn />
          </div>
          <div className="w-fit h-fit lg:hidden rounded-[2.25rem] sm:bg-gradient-to-b sm:from-[#F1F4F8]/50 sm:to-[#1D2025]/50 p-[1px]">
            <div className="w-full h-full rounded-[2.25rem] p-3 sm:bg-[rgb(23,24,27)]">
              <Menu onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>
          </div>
        </div>
      </header>
      <div
        className={`${isMenuOpen ? "block" : "hidden"} lg:hidden bg-Black opacity-[30%] fixed top-0 left-0 right-0 bottom-0 z-10`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div
        className={`lg:hidden w-[18.375rem] fixed right-0 top-0 bg-Black pt-[3.75rem] h-full  z-20 px-[1.25rem]  ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-500`}
      >
        <div className="flex justify-end mb-[1rem]">
          <Close
            onClick={() => setIsMenuOpen(false)}
            className="w-[1.5rem] cursor-pointer"
          />
        </div>
        <section className="gap-[3.5rem] flex flex-col justify-center">
          <div className="flex flex-col Body_1_medium text-Grey-300">
            <Link href="/guide" className="py-[0.75rem] px-[1rem]">
              User Guide
            </Link>
            <Link href="/guide#reviews" className="py-[0.75rem] px-[1rem]">
              User Review
            </Link>
            <Link href="/guide#contact" className="py-[0.75rem] px-[1rem]">
              Contact Us
            </Link>
            <Link href="/price" className="py-[0.75rem] px-[1rem]">
              Price
            </Link>
            <Link href="/#gallery" className="py-[0.75rem] px-[1rem]">
              Gallery
            </Link>
          </div>
          <div className="h-fit w-full flex">
            <OpenBtn width={"w-full"} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Header;
