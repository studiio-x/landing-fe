"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import OpenBtn from "@/components/OpenBtn";
import Card from "@/components/Card";
import { cardData } from "@/constants/card";
import Review from "@/components/Review";
import { reviewData } from "@/constants/review";
import { Arrow } from "@/assets/icons";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import SectionWrapper from "@/components/SectionWrapper";
import { div } from "framer-motion/client";

const MetricsSection = () => {
  const metrics = [
    { value: "100M+", label: "Ads Generated" },
    { value: "94%", label: "Cost Reduction" },
    { value: "88%", label: "Time Saved" },
  ];

  return (
    <div className="mt-[3.5rem] flex flex-col gap-7 lg:flex-row w-full items-center">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="w-full flex-1 rounded-[0.75rem] bg-gradient-to-b from-[#FF8686]/50 to-[#1D2025]/50 p-[1px]"
        >
          <div className="flex w-full py-[3.25rem] flex-col items-center justify-center rounded-[0.75rem] bg-[rgb(23,24,27)]">
            <div className="font-calSans text-5xl sm:text-[4rem] lg:text-[5rem]">
              {metric.value}
            </div>
            <div className="Subhead_1_medium text-Grey-400 whitespace-nowrap">
              {metric.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ContactSection = () => {
  const contactItems = [
    {
      label: "Talk to representative",
      href: `mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`,
    },
    {
      label: "PR & Investor",
      href: `mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`,
    },
    {
      label: "Get support",
      href: `${process.env.NEXT_PUBLIC_INSTAGRAM_URL}`,
    },
  ];

  return (
    <section
      id="contact"
      className="flex flex-col items-center pt-14 mb-[12.5rem]"
    >
      <div className="Body_2_medium rounded-full bg-[rgba(255,255,255,0.03)] px-5 py-2 mb-6">
        Our Users
      </div>
      <div className="font-calSans  text-[1.75rem] lg:text-[3rem] mb-2">
        Contact Us
      </div>
      <div className="Body_2_medium lg:Subhead_1_medium text-Grey-400 mb-[3.75rem]">
        We Are Just A Massage Away
      </div>
      <div className="flex flex-col w-full items-center">
        {contactItems.map((item, index) => (
          <div
            className="flex-1 w-full bg-Grey-800 px-10 py-6 flex justify-between items-center rounded-[0.625rem] max-w-[40rem] mb-5 Body_2_medium sm:Subhead_1_medium"
            key={index}
          >
            {item.label}
            <a href={item.href} key={index} target="_blank">
              <Arrow className="w-12 h-12" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

const GuidePage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/items?category=image&pageNum=0&limit=10`
      );
      if (res.ok) {
        const data = await res.json();
        setItems(data.data.urls);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <Header />

      <div
        className="flex w-full flex-col"
        style={{
          backgroundImage: `url('/images/background1.png')`,
          backgroundSize: "100% auto",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="2xl:px-[6.12rem] lg:px-8 sm:px-[1.5rem] px-4">
          <section className="mb-[11.75rem] flex flex-col items-center gap-8 pt-20">
            <div className="text-center font-calSans  text-2xl sm:text-[2rem] lg:text-[3rem]">
              StudioX <br /> Create Ads, Skip the Cost.
            </div>
            <div className="Body_3_medium sm:Body_2_medium lg:Subhead_1_medium text-center text-Grey-400">
              No Shoots, No Designer, Just Ads. <br /> AI-Powered studio that
              turns your products into ad-ready creatives.
            </div>
            <OpenBtn />
            <div className="mt-[4.25rem] max-h-[30rem] max-w-[60rem] min-2 bg-Grey-700">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="inset-0 h-full w-full object-cover"
              >
                <source src="/videos/guide.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </section>

          <SectionWrapper>
            <div className="mb-2 font-calSans text-xl sm:text-[1.75rem] lg:text-[2.5rem]">
              Choose, Chat, and create your ads.
            </div>
            <div className="Body_3_medium sm:Subhead_1_medium text-Grey-400 mb-11">
              Turn Simple elements into polished ad images and videos in
              seconds.
            </div>
            <img
              src="/images/guide.png"
              alt="guide"
              className="w-full object-cover"
            />
          </SectionWrapper>

          <SectionWrapper>
            <div className="mt-40 mb-60 grid grid-cols-1 gap-7 lg:grid-cols-2">
              {cardData.map((card) => (
                <Card
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  imageSrc={card.imageSrc}
                />
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="reviews">
            <section className="flex flex-col items-center">
              <div className="mb-2 text-center font-calSans text-xl sm:text-[1.75rem] lg:text-[2.5rem]">
                Powering Thousands of Ads Every Day
              </div>
              <div className="Body_3_medium sm:Body_2_medium lg:Subhead_1_medium text-center text-Grey-400">
                rom small businesses to global brands, StudioX is transforming
                how ads are created — faster, easier, smarter.
              </div>
              <MetricsSection />
              <div className="w-screen py-28">
                <Marquee
                  gapPx={16}
                  speedSec={40}
                  direction="left"
                  pauseOnHover
                  className="mb-4"
                >
                  {reviewData.map((rv, i) => (
                    <Review key={`row1-${i}`} {...rv} />
                  ))}
                </Marquee>
                <Marquee
                  gapPx={16}
                  speedSec={40}
                  direction="right"
                  pauseOnHover
                >
                  {reviewData.map((rv, i) => (
                    <Review key={`row2-${i}`} {...rv} />
                  ))}
                </Marquee>
              </div>
            </section>
          </SectionWrapper>

          <SectionWrapper id="contact">
            <ContactSection />
          </SectionWrapper>

          <SectionWrapper>
            <section className="flex flex-col items-center mb-40">
              <div className="font-calSans text-[1.75rem] lg:text-[3rem] mb-6">
                Ready to Creative?
              </div>
              <div className="flex items-center gap-4 Subhead_2_semibold lg:Subhead_1_semibold text-Grey-400 mb-14">
                Get Started For Free
                <Arrow className="w-12 h-12" />
              </div>
              <div className="w-screen">
                <Marquee
                  gapPx={16}
                  speedSec={38}
                  direction="left"
                  pauseOnHover
                  className="mt-8"
                >
                  {items.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Portfolio item ${index}`}
                      className="w-[18rem] h-[21rem] rounded-xl object-cover shrink-0"
                    />
                  ))}
                </Marquee>
              </div>
            </section>
          </SectionWrapper>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GuidePage;
