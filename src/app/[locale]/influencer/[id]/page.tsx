"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { influencers } from "@/constants/landing/influencers";
import { BackArrow } from "@/assets/icons";
import { PATHS } from "@/constants/common/paths";

export default function InfluencerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const influencer = influencers.find((inf) => inf.id === id);

  if (!influencer) {
    return (
      <div>
        <Header />
        <div className="flex flex-col items-center justify-center py-40">
          <p className="Subhead_1_semibold text-Grey-300 mb-6">
            인플루언서를 찾을 수 없습니다.
          </p>
          <Link
            href={PATHS.INFLUENCER}
            className="Body_2_semibold text-Red-400 hover:underline"
          >
            목록으로 돌아가기
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const profileFields = [
    { label: "Name", value: influencer.name },
    { label: "Date of Birth", value: influencer.dateOfBirth },
    { label: "Age", value: String(influencer.age) },
    { label: "Nationality", value: influencer.nationality },
    { label: "Occupation", value: influencer.occupation },
    { label: "Height", value: influencer.height },
    ...(influencer.weight
      ? [{ label: "Weight", value: influencer.weight }]
      : []),
    ...(influencer.bloodType
      ? [{ label: "Blood Type", value: influencer.bloodType }]
      : []),
    { label: "Followers", value: influencer.followers },
    {
      label: "Main Platforms",
      value: influencer.platforms.join(", "),
    },
    {
      label: "Content Category",
      value: influencer.contentCategories.join(" · "),
    },
  ];

  return (
    <div>
      <Header />

      <div className="px-4 sm:px-6 lg:px-8 2xl:px-[6.12rem] pb-24">
        <Link
          href={PATHS.INFLUENCER}
          className="Body_2_medium text-Grey-300 hover:text-White inline-flex items-center gap-1 pt-6 pb-8 transition-colors"
        >
          <BackArrow className="w-5 h-5" />
          Back to Influencers
        </Link>

        {/* Hero section */}
        <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16">
          {/* Profile image */}
          <div className="w-full lg:w-md shrink-0">
            <div className="aspect-3/4 w-full overflow-hidden rounded-2xl bg-Grey-700">
              {influencer.profileImage ? (
                <img
                  src={influencer.profileImage}
                  alt={influencer.nameEn}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-calSans text-6xl text-Grey-500">
                    {influencer.nameEn.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Profile info */}
          <div className="flex flex-col justify-center">
            <h1 className="font-calSans text-[2rem] lg:text-[3rem] mb-8">
              {influencer.nameEn}
            </h1>

            {/* Profile details */}
            <div className="flex flex-col gap-3 mb-10">
              {profileFields.map((field) => (
                <div key={field.label} className="flex">
                  <span className="Body_2_semibold text-Grey-400 w-40 shrink-0">
                    {field.label}:
                  </span>
                  <span className="Body_2_medium text-Grey-100">
                    {field.value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}?subject=AI Influencer 협업 문의 - ${influencer.nameEn}`}
                className="inline-block rounded-[2.25rem] bg-linear-to-b from-[#F1F4F8]/50 to-[#1D2025]/50 p-px"
              >
                <div className="Body_2_semibold rounded-[2.25rem] bg-[rgb(23,24,27)] px-8 py-3 text-White transition-colors duration-300 hover:bg-[rgb(33,34,37)]">
                  협업 문의하기
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {influencer.gallery.length > 0 && (
          <section>
            <h2 className="font-calSans text-xl lg:text-[1.75rem] mb-6">
              Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {influencer.gallery.map((url, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-xl"
                >
                  <img
                    src={url}
                    alt={`${influencer.nameEn} gallery ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
