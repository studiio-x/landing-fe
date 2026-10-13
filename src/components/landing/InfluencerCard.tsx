"use client";

import Link from "next/link";
import type { Influencer } from "@/types/landing/influencer.type";

export default function InfluencerCard({
  influencer,
}: {
  influencer: Influencer;
}) {
  return (
    <Link
      href={`/influencer/${influencer.id}`}
      className="group relative overflow-hidden rounded-2xl bg-Grey-800 transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="aspect-3/4 w-full overflow-hidden bg-Grey-700">
        {influencer.profileImage ? (
          <img
            src={influencer.profileImage}
            alt={influencer.nameEn}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-calSans text-4xl text-Grey-500">
              {influencer.nameEn.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/50 to-transparent px-5 pb-5 pt-20">
        <div className="mb-1 flex items-center gap-2">
          <span className="font-calSans text-xl lg:text-2xl text-White">
            {influencer.nameEn}
          </span>
          {influencer.name !== influencer.nameEn && (
            <span className="Body_3_medium text-Grey-200">
              {influencer.name}
            </span>
          )}
        </div>
        <p className="Body_3_medium text-Grey-300 mb-3">
          {influencer.occupation}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {influencer.contentCategories.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="Caption_medium rounded-full bg-White/10 px-2.5 py-1 text-Grey-100"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
