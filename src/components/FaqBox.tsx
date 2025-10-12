"use client";

import { useState } from "react";
import { Up, Down } from "@/assets/icons";

interface FaqBoxProps {
  question: string;
  answer: string;
}

const FaqBox = ({ question, answer }: FaqBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-Grey-900 rounded-[0.625rem] px-10 py-6 space-y-3 mb-4 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full focus:outline-none"
      >
        <div className="Body_3_semibold sm:Body_1_medium lg:Subhead_1_medium text-Grey-100 text-left">
          {question}
        </div>
        {isOpen ? <Up className="w-6 h-6" /> : <Down className="w-6 h-6" />}
      </button>
      {isOpen && (
        <div className="Caption_medium sm:Body_3_medium lg:Body_1_medium text-Grey-300 pl-8 pr-6">
          → {answer}
        </div>
      )}
    </div>
  );
};

export default FaqBox;
