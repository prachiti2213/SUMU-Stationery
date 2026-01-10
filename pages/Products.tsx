import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { useContent } from "../context/ContentContext";

export const Products = () => {
  const { content } = useContent();

  /* ================= PENCIL WRITING EFFECT ================= */
  const fullText =
    "Whether you're writing exams, signing deals, or sketching ideas, SUMU pencils are built to perform beautifully.";

  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + fullText[index]);
        setIndex(prev => prev + 1);
      }, 35);
      return () => clearTimeout(timer);
    }
  }, [index, fullText]);

  /* ================= USE CASE DATA ================= */
  const useCases = [
    {
      title: "Student Life",
      subtitle: "Exams • Notes • Everyday Writing",
      image: "/studentpencil.jpeg",
      stats: [
        { label: "Lead Grade", value: "HB" },
        { label: "Break Resistance", value: "High" },
        { label: "Daily Usage", value: "8+ hrs" }
      ]
    },
    {
      title: "Professional",
      subtitle: "Meetings • Precision • Elegance",
      image: "/pencil1.jpeg",
      stats: [
        { label: "Finish", value: "Matte" },
        { label: "Grip", value: "Ergonomic" },
        { label: "Durability", value: "Premium" }
      ]
    },
    {
      title: "Artist",
      subtitle: "Sketching • Shading • Control",
      image: "/artistpencil.jpeg",
      stats: [
        { label: "Grades", value: "2B–8B" },
        { label: "Smoothness", value: "Ultra" },
        { label: "Precision", value: "High" }
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* ================= FULL-WIDTH HERO ================= */}
      <section className="relative w-full py-36 overflow-hidden">

        {/* ✅ HORIZONTAL BACKGROUND IMAGE */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/heropencil.jpeg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        />

        {/* ✅ OVERLAY FOR READABILITY */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-gray-100">

          <h1 className="text-5xl md:text-6xl font-serif mb-14 tracking-tight">
            Designed for Every Stroke
          </h1>

          {/* ===== WRITING ROW (ALIGNED WITH PENCIL) ===== */}
          <div className="relative max-w-3xl mx-auto px-6 md:px-12">
            <div className="relative flex items-end">

              {/* MOVING PENCIL */}
              <Pencil
                size={1}
                className="text-sumu-wood mr-2"
                style={{
                  transform: "rotate(-10deg)",
                  translate: `${displayText.length * 7}px`,
                  transition: "translate 0.03s linear"
                }}
              />

              {/* WRITTEN PARAGRAPH */}
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                {displayText}
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* ================= USE CASE CARDS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map(item => (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-2xl group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-0 p-6 text-white w-full">
                <h3 className="text-2xl font-serif">{item.title}</h3>
                <p className="text-sm text-gray-300 mb-4">{item.subtitle}</p>

                <div className="flex justify-between border-t border-white/20 pt-3 text-xs">
                  {item.stats.map(stat => (
                    <div key={stat.label}>
                      <p className="uppercase tracking-widest text-gray-400">
                        {stat.label}
                      </p>
                      <p className="font-semibold">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRODUCT GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 pb-28">
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <h2 className="text-4xl font-serif text-center mb-16">
          Explore Our Collection
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {content.products.map((product, index) => (
            <div
              key={product.id}
              className="relative group overflow-hidden rounded-2xl
                         bg-white/60 backdrop-blur-xl
                         border border-white/40
                         shadow-md
                         transition-all duration-500
                         hover:-translate-y-2 hover:shadow-xl
                         opacity-0 animate-[fadeUp_0.7s_ease-out_forwards]"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-[420px] object-cover
                             transition-transform duration-700
                             group-hover:scale-105"
                />
              </Link>

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur
                              px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {product.category}
              </div>

              <div className="absolute bottom-0 w-full bg-white/90 p-6">
                <h3 className="text-2xl font-serif text-sumu-charcoal">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {product.useCase}
                </p>

                <div className="flex justify-between items-center mt-4 text-xs">
                  <span className="text-gray-500">
                    {product.specifications}
                  </span>

                  <Link
                    to={`/products/${product.id}`}
                    className="uppercase tracking-widest font-semibold
                               text-sumu-charcoal hover:text-sumu-wood"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}; 