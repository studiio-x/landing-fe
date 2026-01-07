"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Down } from "@/assets/icons";

type BackgroundItem = {
  id: string;
  src: string;
  alt?: string;
};

interface BackgroundSwiperProps {
  id: string;
  title: string;
  items: BackgroundItem[];
}

const BackgroundSwiper = ({ id, title, items }: BackgroundSwiperProps) => {
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
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative w-full h-[6.25rem] rounded overflow-hidden bg-Grey-800">
                  <Image
                    src={item.src}
                    alt={item.alt ?? ""}
                    fill
                    className="object-cover cursor-pointer"
                  />
                </div>
              </SwiperSlide>
            ))}
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
