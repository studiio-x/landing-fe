"use client";

import { useEffect, useRef, useState } from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
}

const SectionWrapper = ({ children, id }: SectionWrapperProps) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`
        transition duration-700 ease-out will-change-[opacity,transform]
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
