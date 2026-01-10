import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PageRoute } from "../types";
import { useContent } from "../context/ContentContext";
import "./marquee.css";

/* ================= SCROLL REVEAL HOOK ================= */
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};

export const Home = () => {
  const { content } = useContent();

  const stories = [
    {
      id: 1,
      category: "Corporate Excellence",
      title: "The Executive's Anchor",
      text:
        "In the high-stakes world of business, clarity is power. A SUMU pencil represents the raw potential of an idea before it becomes a strategy.",
      image: "story-1.jpeg",
    },
    {
      id: 2,
      category: "Creative Flow",
      title: "Uninterrupted Imagination",
      text:
        "Artistry demands a seamless connection between mind and medium. The friction of graphite on paper is a sensory language.",
      image: "story-2.jpeg",
    },
    {
      id: 3,
      category: "Academic Foundation",
      title: "Resilience in Learning",
      text:
        "Every expert was once a beginner. We engineer our academic range to withstand the pressure of learning.",
      image: "story-3.jpeg",
    },
  ];

  return (
    <div className="bg-black text-white">

      {/* ================= HERO ================= */}
      <section className="h-screen pt-20 mb-15">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

        <div className="relative z-10 h-full flex flex-col items-center text-center pt-32 px-6">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-5">
            Defining the Art
          </h1>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-6xl mb-6">
            of Writing.
          </h2>

          <p className="relative max-w-2xl text-white/80 leading-relaxed mb-32 pl-4
            before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-yellow-400
            after:absolute after:right-0 after:top-0 after:h-full after:w-[2px] after:bg-yellow-400 pr-4">
            Precision. Elegance. Legacy.
          </p>

          <Link
            to={PageRoute.GALLERY}
            className="px-14 py-4 rounded-full border border-white text-xs tracking-[0.3em] uppercase
            hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition"
          >
            EXPLORE COLLECTION
          </Link>
        </div>
      </section>

      {/* ================= STORY CHAPTERS ================= */}
      {stories.map((story, index) => {
        const { ref, visible } = useScrollReveal();

        return (
          <React.Fragment key={story.id}>
            <section className="py-10 bg-black">
              <div
                ref={ref}
                className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ease-out ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                }`}
              >
                <div className="bg-white text-black grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-16
                  hover:-translate-y-2 transition-all duration-700
                  hover:shadow-[0_60px_140px_rgba(0,0,0,0.18)]">

                  {/* IMAGE */}
                  <div className={`relative overflow-hidden aspect-square md:aspect-auto md:h-[60vh] ${index % 2 !== 0 ? "lg:order-2" : ""}`}
>
                    <img
                      src={`/images/${story.image}`}
                      alt={story.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2500ms] hover:scale-110"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className={index % 2 !== 0 ? "lg:order-1" : ""}>
                    <span className="text-xs tracking-[0.4em] uppercase text-sumu-wood block mb-10">
                      {story.category}
                    </span>

                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-10">
                      {story.title}
                    </h2>

                    <p className="text-gray-600 leading-relaxed max-w-md mb-12">
                      {story.text}
                    </p>

                    <Link
                      to={PageRoute.GALLERY}
                      className="inline-flex items-center text-xs tracking-[0.4em] uppercase hover:text-sumu-wood transition"
                    >
                      View Gallery <ChevronRight className="ml-4 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* ===== TERRA STRIP (ONLY ON LEARNING) ===== */}
            {story.title === "Resilience in Learning" && (
              <section className="bg-[#F6F6E9] py-20 text-black">
                <div className="max-w-4xl mx-auto px-6 text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-yellow-700 mb-8">
                    ENGINEERED THOUGHT / 01
                  </p>
                  <h3 className="font-serif text-[2.4rem] md:text-[3.2rem] text-yellow-800 mb-10">
                    Balanced by design. Enduring by nature.
                  </h3>
                  <p className="max-w-3xl mx-auto text-[15px] leading-[1.8] text-yellow-900/70">
                    Crafted with child-safe materials, precision graphite formulation,
                    and natural grip geometry—supporting focus and comfort.
                  </p>
                </div>
              </section>
            )}
          </React.Fragment>
        );
      })}

      {/* ================= PRODUCTS GRID ================= */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {content.products.slice(0, 3).map((product, index) => {
            const ref = useRef<HTMLDivElement | null>(null);
            const [visible, setVisible] = useState(false);

            useEffect(() => {
              if (!ref.current) return;
              const observer = new IntersectionObserver(
                ([entry]) => {
                  if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                  }
                },
                { threshold: 0.25 }
              );
              observer.observe(ref.current);
              return () => observer.disconnect();
            }, []);

            return (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                ref={ref}
                className={`group block transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="relative aspect-[4/5] bg-white overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition" />
                  <div className="absolute bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition">
                    <h3 className="font-serif text-xl text-black mb-1">
                      {product.name.replace(/^SUMU\s+/, "")}
                    </h3>
                    <p className="text-xs tracking-[0.35em] uppercase text-gray-600">
                      {product.category}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

     {/* ================= FINAL CTA ================= */}
      <section className="bg-black text-white py-15 text-center mb-10">
        <h2 className="font-serif text-3xl md:text-7xl mb-10 relative inline-block
          after:content-[''] after:absolute after:left-0 after:-bottom-3
          after:h-[2px] after:w-full after:bg-yellow-500
          after:scale-x-0 after:origin-left
          hover:after:scale-x-100
          after:transition-transform after:duration-500 after:ease-out">
          Begin Your Legacy
        </h2>

        <h1 className="font-serif font-light text-2xl md:text-3xl leading-relaxed mb-12 tracking-wide text-white/90">
          From the first sketch to the final signature,
          <span className="block mt-2 text-yellow-400 font-medium">
            we are with you.
          </span>
        </h1>

        <Link
          to={PageRoute.CONTACT}
          className="inline-block border border-white px-20 py-4 text-xs tracking-[0.4em] uppercase
             hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition"
        >
          Partner With Us
        </Link>
      </section>
      

      {/* ================= FEATURE MARQUEE ================= */}
      <section className="bg-black border-t border-white/10 py-4">
        <div className="marquee">
          <div className="marquee-track text-sm tracking-[0.4em] uppercase text-white">
            <span className="mx-10">Balanced Weight</span>•
            <span className="mx-10">Extra-Dark Graphite</span>•
            <span className="mx-10">Child-Safe Materials</span>•
            <span className="mx-10">Natural Grip Geometry</span>•
            <span className="mx-10">Designed to Think</span>
            <span className="mx-10">Balanced Weight</span>•
            <span className="mx-10">Extra-Dark Graphite</span>•
            <span className="mx-10">Child-Safe Materials</span>•
            <span className="mx-10">Natural Grip Geometry</span>•
            <span className="mx-10">Designed to Think</span>
          </div>
        </div>
      </section>

    </div>
  );
};