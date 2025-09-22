"use client";

import { Check } from "@/assets/icons";

interface PriceTagProps {
  plan: {
    name: string;
    for: string;
    yearlyPrice: number | null;
    monthlyPrice: number | null;
    subtitle: string | { yearly: string; monthly: string };
    buttonText: string;
    features: string[];
  };
  isMonthly: boolean;
}

const PriceTag = ({ plan, isMonthly }: PriceTagProps) => {
  const isEnterprise = plan.name === "Enterprise";

  const price = isMonthly ? plan.monthlyPrice : plan.yearlyPrice;
  const subtitleText = isMonthly
    ? typeof plan.subtitle === "object"
      ? plan.subtitle.monthly
      : plan.subtitle
    : typeof plan.subtitle === "object"
      ? plan.subtitle.yearly
      : plan.subtitle;

  return (
    <div
      className="
        bg-Grey-800 rounded-lg py-8 px-5 w-full min-h-[46rem] group
        hover:shadow-[inset_0_0_0_1px_rgba(255,134,134,0.25)]
        hover:bg-[radial-gradient(ellipse_400%_110%_at_0%_0%,_#1D2025_0%,_rgba(29,32,37,0.5)_26.99%,_rgba(29,32,37,0.25)_55.71%,_rgba(255,117,117,0.1)_100%)]
        transition-colors duration-300 ease-in-out
      "
    >
      <div className="flex flex-col h-1/4 mb-5">
        <div className="font-calSans text-[2rem] group-hover:text-Red-300">
          {plan.name}
        </div>
        <div className="Caption_medium text-Grey-300">{plan.for}</div>
        <div className="flex mt-8 items-end gap-1">
          {isEnterprise ? (
            <div className="Body_3_semibold text-Grey-100 h-[4.6rem]">
              {plan.subtitle as string}
            </div>
          ) : (
            <>
              <div className="font-calSans text-[2.5rem]/[2.4rem] group-hover:text-Red-400">
                ${price} USD
              </div>
              {plan.name !== "Basic" && (
                <div className="Body_2_medium text-Grey-300">/ mo</div>
              )}
            </>
          )}
        </div>

        {!isEnterprise && (
          <div className="Body_3_regular text-Grey-400 mb-5 mt-3">
            {`<${subtitleText}>`}
          </div>
        )}
      </div>
      <div className="w-full rounded-[2.25rem] bg-gradient-to-b from-[#F1F4F8]/30 to-[#1D2025]/50 p-[1px]">
        <button className="Body_2_semibold flex w-full items-center justify-center rounded-[2.25rem] bg-[rgb(37,39,44)] py-3">
          {plan.buttonText}
        </button>
      </div>

      <div className="bg-Grey-600 h-px w-full mt-8 mb-5" />

      {plan.features.map((feature, index) => (
        <div key={index} className="flex gap-3 mb-2 ">
          <Check className="h-6 w-6" />
          <div className="w-fit  Body_3_regular text-Grey-300">{feature}</div>
        </div>
      ))}
    </div>
  );
};

export default PriceTag;
