import Link from "next/link";
import { Close, Logo, Menu } from "@/assets/icons";
import OpenBtn from "./OpenBtn";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/guide", label: "User Guide" },
  { href: "/guide#reviews", label: "User Review" },
  { href: "/guide#contact", label: "Contact Us" },
  { href: "/price", label: "Price" },
  { href: "/#gallery", label: "Gallery" },
] as const;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  isMenuOpen && document.body.classList.add("overflow-hidden");
  !isMenuOpen && document.body.classList.remove("overflow-hidden");

  return (
    <>
      {/* Header */}
      <header className="flex w-full justify-between px-3 pt-4 pb-3 lg:px-8 lg:pt-5 lg:pb-3 2xl:px-[6.12rem]">
        {/* Logo & Desktop Navigation */}
        <div className="flex w-fit items-center">
          <Link href="/">
            <Logo className="mr-12 w-[5.3125rem]" />
          </Link>
          <nav className="Body_2_semibold hidden gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* CTA & Mobile Menu Button */}
        <div className="flex gap-3">
          <div className="hidden h-fit w-fit sm:flex">
            <OpenBtn />
          </div>
          <MenuButton onClick={toggleMenu} />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-10 bg-Black opacity-30 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-20 h-full w-[18.375rem] bg-Black px-5 pt-[3.75rem] transition-transform duration-500 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-4 flex justify-end">
          <Close onClick={closeMenu} className="w-6 cursor-pointer" />
        </div>

        <section className="flex flex-col gap-14">
          <nav className="Body_1_medium flex flex-col text-Grey-300">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <OpenBtn width="w-full" />
        </section>
      </aside>
    </>
  );
};

// Menu Button Component
const MenuButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="h-fit w-fit rounded-[2.25rem] p-[1px] lg:hidden sm:bg-gradient-to-b sm:from-[#F1F4F8]/50 sm:to-[#1D2025]/50"
    aria-label="Toggle menu"
  >
    <div className="h-full w-full rounded-[2.25rem] p-3 sm:bg-[rgb(23,24,27)]">
      <Menu />
    </div>
  </button>
);

export default Header;
