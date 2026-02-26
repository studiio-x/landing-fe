import { Check } from "@/assets/icons";
import OpenBtn from "@/components/landing/OpenBtn";

interface FreePlanMessages {
  name: string;
  description: string;
  price: string;
  perMonth: string;
  onlyMonthly: string;
  credits: string;
  storage: string;
  downloads: string;
}

interface FreePlanSectionProps {
  isMonthly: boolean;
  messages: FreePlanMessages;
}

const FreePlanSection = ({ isMonthly, messages }: FreePlanSectionProps) => {
  const features = [messages.credits, messages.storage, messages.downloads];

  return (
    <div className="bg-Grey-900 px-5 sm:px-10 lg:px-16 2xl:px-16 py-9 w-full flex flex-col lg:flex-row justify-between mt-9 rounded-lg">
      <div className="flex justify-between gap-6">
        <div className="flex flex-col">
          <div className="font-calSans text-[2rem]">{messages.name}</div>
          <div className="Caption_medium text-Grey-300">
            {messages.description}
          </div>
        </div>
        <OpenBtn />
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col mr-[3.25rem] gap-3">
          <div className="flex mt-2 items-end gap-1">
            <div className="font-calSans text-[2.5rem]/[2.4rem]">
              {messages.price}
            </div>
            <div className="Body_2_medium text-Grey-300">
              {messages.perMonth}
            </div>
          </div>
          <div className="Body_3_regular text-Grey-400">
            {messages.onlyMonthly}
          </div>
        </div>
        <div className="bg-Grey-600 w-full h-px lg:w-px lg:h-full max-lg:mt-8 max-lg:mb-6 lg:mr-6" />
        <div className="flex flex-col">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-3 mb-2">
              <Check className="h-6 w-6" />
              <div
                className="w-fit Body_3_regular text-Grey-300"
                dangerouslySetInnerHTML={{ __html: feature }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreePlanSection;
