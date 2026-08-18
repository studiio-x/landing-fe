import FaqBox from "@/components/landing/FaqBox";
import { FaqData } from "@/constants/landing/faq";

interface FaqSectionProps {
  title: string;
}

const FaqSection = ({ title }: FaqSectionProps) => {
  return (
    <section className="flex flex-col 2xl:flex-row mb-44 gap-y-8 sm:gap-y-[3.25rem] gap-x-[8.6305rem]">
      <div className="font-calSans text-[1.5rem] sm:text-[2rem] lg:text-[3rem] whitespace-nowrap">
        {title}
      </div>
      <div className="flex flex-col flex-1 items-end">
        {FaqData.map((faq, index) => (
          <FaqBox
            key={index}
            question={`${index + 1}. ${faq.question}`}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
