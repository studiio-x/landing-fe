import React from "react";

interface ReviewProps {
  title: string;
  content: string;
}

const Review = ({ title, content }: ReviewProps) => {
  return (
    <div
      className="flex h-[16.3rem] w-104 flex-col bg-cover bg-center bg-no-repeat px-7 pt-20"
      style={{
        backgroundImage: `url('/images/landing/review.png')`,
      }}
    >
      <div className="Subhead_1_semibold w-88 whitespace-normal">
        {title}
      </div>
      <div className="Body_3_regular mt-4 w-88 whitespace-normal text-Grey-400">
        {content}
      </div>
    </div>
  );
};

export default Review;
