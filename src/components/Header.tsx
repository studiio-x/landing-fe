import Link from "next/link";
import { Logo } from "@/assets/icons";
import OpenBtn from "./OpenBtn";

const Header = () => {
  return (
    <header className="flex w-full justify-between px-[6.12rem] py-5">
      <div className="flex w-fit self-center">
        <Logo className="mr-12 w-[5.3125rem] self-center" />
        <div className="Body_2_semibold flex gap-10">
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
