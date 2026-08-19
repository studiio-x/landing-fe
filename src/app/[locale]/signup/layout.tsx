import { LogoRed } from "@/assets/icons";
import Header from "@/components/dashboard/Header";
import type { ReactNode } from "react";

const SignupLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        <section className="flex-[56%] relative flex justify-center items-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/landing/main-poster.png"
          >
            <source src="/videos/guide-optimized.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-b from-[rgba(8,8,8,0.80)] to-[rgba(8,8,8,0.45)]" />
          <LogoRed className="z-20 w-84 h-auto" />
        </section>

        <section className="flex-[44%] pt-45 flex flex-col px-34 relative">
          {children}
        </section>
      </main>
    </div>
  );
};

export default SignupLayout;
