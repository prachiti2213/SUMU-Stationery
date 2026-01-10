import React, { useEffect, useRef, useState } from "react";
import { useContent } from "../context/ContentContext";
import "./marquee.css";
import PencilImage from "../components/PencilImage";

export const About = () => {
  const { content } = useContent();

  const titleRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);

  const [showUnderline, setShowUnderline] = useState(false);
  const [pauseScroll, setPauseScroll] = useState(false);

  /* ===== UNDERLINE ANIMATION ON SCROLL ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShowUnderline(true),
      { threshold: 0.6 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  /* ===== AUTO SCROLL ===== */
  useEffect(() => {
    const container = stripRef.current;
    if (!container) return;

    let animationId: number;
    const speed = 0.6;

    const autoScroll = () => {
      if (!pauseScroll) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, [pauseScroll]);

  return (
    <div className="bg-white fade-in mt-10">

      {/* ================= HEADER ================= */}
      <section className="py-16 md:py-20 bg-sumu-stone">
        <div className="max-w-3xl mx-auto px-4 text-center">

          <p className="uppercase tracking-[0.35em] text-gray-400 text-[10px] sm:text-xs mb-6">
            Since 1999
          </p>

          <div ref={titleRef} className="inline-block relative mb-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight text-sumu-charcoal">
              SUMU
            </h1>

            <span
              className={`absolute left-0 -bottom-2 h-[2px] bg-yellow-400 transition-all duration-1000
              ${showUnderline ? "w-full" : "w-0"}`}
            />
          </div>

          <p className="max-w-2xl mx-auto text-gray-500 text-base sm:text-lg leading-relaxed mt-6">
            Thoughtfully crafted stationery for minds that value clarity,
            discipline, and timeless design.
          </p>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="max-w-4xl mx-auto px-6 py-14 md:py-20">
        <p className="text-lg sm:text-xl font-serif text-sumu-charcoal leading-relaxed">
          {content.aboutText}
        </p>
      </section>

      {/* ================= IMAGE ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 md:pb-20">
        <div className="relative overflow-hidden rounded-sm">
          <img
            src="/SUMU.jpeg"
            alt="SUMU craftsmanship"
            className="
              w-full
              h-[45vh] sm:h-[55vh] md:h-[70vh]
              object-cover
              brightness-95 contrast-105
              hover:brightness-100
              transition-all duration-700
            "
          />

          <span className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6
            bg-white/90 px-3 py-1.5 sm:px-4 sm:py-2
            text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gray-600">
            Crafted with Precision
          </span>
        </div>
      </section>

      {/* ================= PHILOSOPHY ================= */}
      <section className="bg-sumu-charcoal py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <p className="uppercase tracking-[0.4em] text-[10px] sm:text-xs text-yellow-400 mb-8">
            Our Philosophy
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-tight mb-8">
            Good tools disappear. <br />
            Great ones sharpen focus.
          </h2>

          <p className="font-serif text-xl sm:text-2xl text-yellow-400">
            Discipline is a quiet advantage.
          </p>
        </div>
      </section>

      {/* ================= EVOLUTION ================= */}
<section className="max-w-6xl mx-auto px-6 py-15 md:py-68">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

    {/* LEFT – Pencil */}
    <div className="flex justify-center md:justify-start">
      <PencilImage />
    </div>

    {/* RIGHT – Text (same content as before) */}
    <div className="text-center md:text-left">
      <h3 className="text-6xl sm:text-5xl font-serif text-sumu-charcoal mb-3">
        Evolution & Growth
      </h3>

      <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
        From classrooms to boardrooms, SUMU serves students,
        professionals, institutions, and organizations across regions.
        As we grow, our focus remains unchanged reliable tools,
        refined design, and lasting quality.
      </p>

      <div className="mt-12">
        <span className="block w-24 sm:w-32 h-px bg-gray-300"></span>
      </div>

      <p className="mt-10 font-serif text-lg sm:text-xl text-sumu-charcoal">
        Simple tools.
        <br />
        Serious intent.
      </p>
    </div>

  </div>
</section>


      {/* ================= AUTO SCROLL STRIP =================
      <section className="py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            ref={stripRef}
            className="flex gap-4 sm:gap-5 overflow-hidden"
            style={{ perspective: "1400px" }}
          >
            {[
              "/images/1.png",
              "/images/2.png",
              "/images/3.png",
              "/images/4.png",
              "/images/5.png",
              "/images/6.png",
              "/images/7.png",
              "/images/8.png",
              "/images/1.png",
              "/images/2.png",
              "/images/3.png",
              "/images/4.png",
              "/images/5.png",
              "/images/6.png",
              "/images/7.png",
              "/images/8.png",
            ].map((img, index) => (
              <div
                key={index}
                onMouseEnter={() => setPauseScroll(true)}
                onMouseLeave={() => setPauseScroll(false)}
                className="
                  group relative flex-shrink-0
                  h-18 w-32
                  sm:h-22 sm:w-40
                  md:h-28 md:w-48
                "
              >
                <img
                  src={img}
                  alt={`SUMU detail ${index + 1}`}
                  className="
                    h-full w-full object-contain p-2 rounded-sm
                    transition-all duration-700
                    group-hover:scale-105
                  "
                /> */}

                {/* reflection (hidden on very small screens) */}
                {/* <img
                  src={img}
                  alt=""
                  className="
                    hidden sm:block
                    absolute top-full mt-2
                    h-full w-full object-contain p-2
                    opacity-30 blur-[1px]
                  "
                  style={{
                    transform: "scaleY(-1)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}

    </div>
  );
};
