import Link from "next/link";
import { Logo } from "@/assets/icons";
import OpenBtn from "./OpenBtn";

const Header = () => {
  return (
    <header className="flex w-full justify-between lg:px-[6.12rem] sm:px-8 px-4 py-5">
      <div className="flex w-fit self-center">
        <Link href="/">
          <Logo className="mr-12 w-[5.3125rem] self-center" />
        </Link>
        <div className="Body_2_semibold gap-10 hidden sm:flex">
          <Link href="/guide">User Guide</Link>
          <Link href="/guide#reviews">User Review</Link>
          <Link href="/guide#contact">Contact Us</Link>
          <Link href="/price">Price</Link>
          <Link href="/#gallery">Gallery</Link>
        </div>
      </div>

      <OpenBtn />
    </header>
  );
};

export default Header;
