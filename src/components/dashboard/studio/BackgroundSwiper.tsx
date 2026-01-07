"use client";

import Image from "next/image";
import clsx from "clsx";

import { Down } from "@/assets/icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type BackgroundItem = {
  id: string;
  src: string;
  alt?: string;
};

interface BackgroundSwiperProps {
  id: string;
  title: string;
  items: BackgroundItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const BackgroundSwiper = ({
  id,
  title,
  items,
  selectedId,
  onSelect,
}: BackgroundSwiperProps) => {
  return (
    <section className="w-full flex flex-col gap-2">
      <h3 className="pl-9 Body_2_medium text-Grey-100">{title}</h3>

      <div className="relative items-center flex gap-3">
        <button className={`swiper-prev-${id}`} aria-label="이전">
          <Down className="rotate-90 h-6 w-6" />
        </button>

        <div className="flex-1 w-[324px] min-w-0">
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
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
                    className="w-full"
                  >
                    <div
                      className={clsx(
                        "relative w-full h-[6.25rem] rounded overflow-hidden",
                        isSelected
                          ? "bg-gradient-to-b from-Red-350 to-Red-500 p-[1.5px]"
                          : "bg-Grey-800"
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
        </div>

        <button className={`swiper-next-${id}`} aria-label="다음">
          <Down className="-rotate-90 h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default BackgroundSwiper;
