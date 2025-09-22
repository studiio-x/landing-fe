import React from "react";

interface ReviewProps {
  title: string;
  content: string;
}

const Review: React.FC<ReviewProps> = ({ title, content }) => {
  return (
    <div
      className="flex h-[16.3rem] w-[26rem] flex-col bg-cover bg-center bg-no-repeat px-7 pt-20"
      style={{
        backgroundImage: `url('/images/review.png')`,
      }}
    >
      <div className="Subhead_1_semibold w-[22rem] whitespace-normal">
        {title}
      </div>
      <div className="Body_3_regular mt-4 w-[22rem] whitespace-normal text-Grey-400">
        {content}
      </div>
    </div>
  );
};

export default Review;
