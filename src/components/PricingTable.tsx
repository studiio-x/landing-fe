import React from "react";
import { Close, Circle } from "@/assets/icons";

export default function PricingTable() {
  const plans = [
    { name: "Free" },
    { name: "Basic" },
    { name: "Standard" },
    { name: "Pro" },
    { name: "Enterprise" },
  ];

  const rows = [
    {
      feature: "Price",
      values: ["$0", "$15", "$33", "$59", "Custom"],
    },
    {
      feature: "Target",
      values: [
        "Free forever",
        "For individual creators",
        "For professional creators",
        "For professional marketers & teams",
        "For organizations needing collaboration & support",
      ],
      valuesFont: "Caption_medium",
      valuesFontTwice: true,
    },
    {
      feature: "Credits",
      values: [
        "100",
        "300",
        "900",
        "3,000",
        { value: "Custom", sub: "(Unlimited option available)" },
      ],
    },
    {
      feature: "Cloud Storage",
      values: ["5GB", "10GB", "50GB", "200GB", "1TB+"],
    },
    {
      feature: "Generated Image\n& Video Download",
      featureFont: true,
      values: [
        "With watermark",
        ...[0, 1, 2, 3].map((index) => <Circle key={index} />),
      ],
    },
    {
      feature: "Remove StudioX Watermark",
      values: [
        <Close key={0} />,
        ...[0, 1, 2, 3].map((index) => <Circle key={index} />),
      ],
    },
    {
      feature: "AI Chat Editing",
      values: [
        { value: "Unlimited", sub: "(text only)" },
        {
          value: "Unlimited",
          sub: "(text, up to 10 reference images / month)",
        },
        { value: "Unlimited", sub: "(text + unlimited reference images)" },
        { value: "Unlimited", sub: "(text + unlimited reference images)" },
        { value: "Unlimited", sub: "(text + unlimited reference images)" },
      ],
      valuesFont: "Body_2_semibold",
    },
    {
      feature: "Image History & Version Control",
      featureFont: true,
      values: [
        ...[0, 1].map((index) => <Close key={index} />),
        ...[0, 1, 2].map((index) => <Circle key={index} />),
      ],
    },
    {
      feature: "Short-form Video Generation",
      featureFont: true,
      values: [
        ...[0, 1].map((index) => <Close key={index} />),
        "Up to 10 per month",
        "Unlimited",
        "Unlimited",
      ],
    },
    {
      feature: "Team Invitation\n& Project Collaboration",
      featureFont: true,
      values: [
        ...[0, 1, 2].map((index) => <Close key={index} />),
        "Up to 5 members",
        "Unlimited",
      ],
    },
    {
      feature: "Priority Support",
      values: [
        ...[0, 1, 2].map((index) => <Close key={index} />),
        ...[0, 1].map((index) => <Circle key={index} />),
      ],
    },
    {
      feature: "Brand-specific Templates\n& Kits",
      featureFont: true,
      values: [
        ...[0, 1, 2, 3].map((index) => <Close key={index} />),
        <Circle key={0} />,
      ],
    },
    {
      feature: "Customer Success Manager",
      featureFont: true,
      values: [
        ...[0, 1, 2, 3].map((index) => <Close key={index} />),
        <Circle key={0} />,
      ],
    },
    {
      feature: "Custom Onboarding\n& AI Training",
      featureFont: true,
      values: [
        ...[0, 1, 2, 3].map((index) => <Close key={index} />),
        <Circle key={0} />,
      ],
    },
    {
      feature: "Enterprise-level Security",
      values: [
        ...[0, 1, 2, 3].map((index) => <Close key={index} />),
        <Circle key={0} />,
      ],
    },
  ];

  return (
    <div className="mb-52 text-white overflow-hidden ">
      <div className="max-sm:overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead>
            <tr className="border-b border-Grey-500">
              <th className="sticky left-0 z-20 text-center  px-6 py-4  Caption_medium lg:text-[0.77rem]  2xl:Body_2_medium  font-calSans 2xl:text-Body_2_medium text-Grey-400 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-Grey-500 border-Grey-500 bg-Black font-medium">
                Benefit / Feature
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  className={`px-6 py-4 text-center font-normal text-[0.688rem] lg:text-[1.13rem] 2xl:text-[1.75rem] font-calSans border-r border-Grey-500  text-Grey-100 last:border-r-0`}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={`${idx % 2 === 0 ? "bg-Grey-800" : "bg-Black"} font-medium`}
              >
                <td
                  className={`sticky left-0 text-center z-10 Caption_medium lg:Body_3_medium text-Grey-200 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-Grey-500 whitespace-pre-line min-w-[7.38rem] lg:min-w-[13.8rem] 2xl:min-w-[17.82rem] max-lg:px-1  ${idx % 2 === 0 ? "bg-Grey-800" : "bg-Black"} ${row.featureFont ? "2xl:Body_1_medium" : " 2xl:Subhead_2_medium"}`}
                >
                  {row.feature}
                </td>
                {row.values.map((value, i) => (
                  <td
                    key={i}
                    className={`px-6 py-4 text-center text-[0.5rem]  ${row.valuesFontTwice === true ? `lg:${row.valuesFont}` : row.valuesFont ? "2xl:Body_1_medium" : "2xl:Subhead_2_medium"} lg:Body_3_medium  text-Grey-100 border-r border-Grey-500 last:border-r-0 whitespace-pre-line`}
                  >
                    {typeof value === "string" ? (
                      value
                    ) : React.isValidElement(value) ? (
                      value
                    ) : typeof value === "object" &&
                      value !== null &&
                      "value" in value ? (
                      <div>
                        <div>{value.value}</div>
                        {value.sub && (
                          <div className="text-[0.5rem] lg:text-[0.45rem] 2xl:text-[0.63rem] text-grey-400 leading-[140%] text-Grey-300">
                            {value.sub}
                          </div>
                        )}
                      </div>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
