import OpenBtn from "@/components/landing/OpenBtn";

interface CtaSectionProps {
  title: string;
}

const CtaSection = ({ title }: CtaSectionProps) => {
  return (
    <section className="font-calSans text-[1.5rem] sm:text-[2rem] lg:text-[3rem] 2xl:text-[4rem] flex flex-col gap-7 items-center mb-[17.5rem]">
      {title}
      <OpenBtn />
    </section>
  );
};

export default CtaSection;
