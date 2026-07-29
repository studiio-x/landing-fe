"use client";

import Image from "next/image";
import clsx from "clsx";

import { Down } from "@/assets/icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

type BackgroundItem = {
  id: string;
  src: string;
  alt?: string;
};

interface BackgroundSwiperProps {
  id: string;
  title?: string;
  items: BackgroundItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  isLoading?: boolean;
}

const BackgroundSwiper = ({
  id,
  title,
  items,
  selectedId,
  onSelect,
  isLoading,
}: BackgroundSwiperProps) => {
  if (!isLoading && items.length === 0) {
    return null;
  }

  const showSkeleton = isLoading;

  return (
    <section className="w-full flex flex-col gap-2">
      {title !== undefined && (
        <h3 className="pl-9 Body_2_medium">
          {isLoading ? (
            <span className="inline-block w-20 h-[1em] rounded bg-Grey-700 animate-pulse" />
          ) : (
            <span className="text-Grey-100">{title}</span>
          )}
        </h3>
      )}

      <div className="relative items-center flex gap-3 justify-center">
        <button
          className={clsx(`swiper-prev-${id}`, showSkeleton && "invisible")}
          aria-label="이전"
        >
          <Down className="rotate-90 h-6 w-6" />
        </button>

        <div className="w-81 min-w-0">
          {showSkeleton ? (
            <div className="flex gap-3 justify-center">
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className={clsx(
                    "w-25 h-25 rounded bg-Grey-700",
                    isLoading && "animate-pulse",
                  )}
                />
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Navigation]}
              slidesPerView={3}
              slidesPerGroup={3}
              spaceBetween={12}
              loop
              navigation={{
                prevEl: `.swiper-prev-${id}`,
                nextEl: `.swiper-next-${id}`,
              }}
            >
              {items.map((item) => {
                const isSelected = selectedId === item.id;

                return (
                  <SwiperSlide key={item.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(item.id)}
                      className="w-25"
                    >
                      <div
                        className={clsx(
                          "relative w-full h-25 rounded overflow-hidden",
                          isSelected
                            ? "bg-linear-to-b from-Red-350 to-Red-500 p-[1.5px]"
                            : "bg-Grey-800",
                        )}
                      >
                        <div className="relative w-full h-full rounded overflow-hidden bg-Grey-800">
                          <Image
                            src={item.src}
                            alt={item.alt ?? ""}
                            fill
                            sizes="6.25rem"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </button>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>

        <button
          className={clsx(`swiper-next-${id}`, showSkeleton && "invisible")}
          aria-label="다음"
        >
          <Down className="-rotate-90 h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default BackgroundSwiper;
