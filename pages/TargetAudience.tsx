import React from "react";
import {
  School,
  Building2,
  Briefcase,
  Truck,
  Hotel,
} from "lucide-react";

export const TargetAudience = () => {
  const audiences = [
    {
      title: "Students & Institutions",
      icon: <School size={32} />,
      accent: "#3FAE6C",
      desc: "Empowering the next generation with durable, ergonomic, and thoughtfully engineered writing instruments designed for daily learning and examinations.",
    },
    {
      title: "Corporate & Business",
      icon: <Building2 size={32} />,
      accent: "#C9A24D",
      desc: "Premium, custom-branded stationery that reflects clarity, confidence, and professional excellence across boardrooms, conferences, and executive desks.",
    },
    {
      title: "Offices & Professionals",
      icon: <Briefcase size={32} />,
      accent: "#64748B",
      desc: "Reliable tools crafted for precision and comfort — supporting focused work environments from design studios to financial offices.",
    },
    {
      title: "Luxury Hotels & Conferences",
      icon: <Hotel size={32} />,
      accent: "#7C2D3A",
      desc: "Refined writing instruments curated for premium hospitality spaces, elevating guest experiences and high-profile corporate events.",
    },
    {
      title: "Distributors & Retail Partners",
      icon: <Truck size={32} />,
      accent: "#475569",
      desc: "Long-term partnerships built on consistency, efficient supply chains, and presentation-ready products with strong market appeal.",
    },
  ];

  return (
    <section className="relative py-28 bg-[#f6f3ec]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-serif text-sumu-charcoal mb-4 tracking-tight">
            Who We Serve
          </h1>

          <div className="w-16 h-[1px] bg-sumu-wood mx-auto mb-6" />

          <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-[1.9] font-light">
            SUMU collaborates with institutions and enterprises that value
            precision, trust, and enduring craftsmanship—delivering tools that
            quietly support meaningful work.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {audiences.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-white
                border border-black/5
                p-10
                transition-all duration-500 ease-out
                hover:-translate-y-1
                hover:shadow-[0_30px_80px_rgba(0,0,0,0.08)]
                lg:col-span-2
                ${index === 3 ? "lg:col-start-2" : ""}
              `}
            >
              {/* ICON */}
              <div
                className="w-14 h-14 flex items-center justify-center rounded-full mb-8"
                style={{
                  backgroundColor: `${item.accent}14`,
                  color: item.accent,
                }}
              >
                {item.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-2xl font-serif text-sumu-charcoal mb-3 tracking-tight">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-600 leading-[1.85] font-light">
                {item.desc}
              </p>

              {/* ACCENT LINE */}
              <div
                className="absolute bottom-0 left-0 w-full h-[2px]
                           opacity-0 group-hover:opacity-100
                           transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to right, transparent, ${item.accent}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
