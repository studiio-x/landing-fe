import Link from "next/link";
import { Logo, Menu } from "@/assets/icons";
import OpenBtn from "./OpenBtn";

const Header = () => {
  return (
    <header className="flex w-full justify-between 2xl:px-[6.12rem] lg:px-8 px-3 py-6">
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
            <Menu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
