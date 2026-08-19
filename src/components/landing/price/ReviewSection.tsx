import { Arrow } from "@/assets/icons";
import Review from "@/components/landing/Review";
import Marquee from "@/components/landing/Marquee";
import { reviewData } from "@/constants/landing/review";

interface ReviewSectionProps {
  title: string;
  galleryLink: string;
}

const ReviewSection = ({ title, galleryLink }: ReviewSectionProps) => {
  return (
    <section className="flex flex-col items-center mb-48">
      <div className="font-calSans text-[1.5rem] sm:text-[2rem] lg:text-[3rem] mb-6">
        {title}
      </div>
      <div className="flex gap-4 pl-6 mb-[3.25rem] Subhead_2_semibold sm:Subhead_1_semibold text-Grey-400 items-center">
        {galleryLink} <Arrow className="w-12 h-12" />
      </div>
      <div className="w-screen py-6">
        <Marquee gapPx={16} speedSec={35} direction="left" pauseOnHover>
          {reviewData.map((rv, i) => (
            <Review key={i} {...rv} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default ReviewSection;
