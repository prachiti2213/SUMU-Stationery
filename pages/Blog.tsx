import React from 'react';
import { useContent } from '../context/ContentContext';

export const Blog = () => {
  const { content } = useContent();

  return (
    <div className="min-h-screen mt-20 py-28 bg-gradient-to-b from-[#FAFAF7] via-[#F5F6F2] to-[#FAFAF7]">
      <div className="max-w-6xl mx-auto px-6">

        {/* ===== HEADER (ENHANCED) ===== */}
       {/* ===== HEADER (UNIQUE & ADORABLE) ===== */}
<div className="relative text-center mb-32">

  {/* FLOATING AURA */}
  <div
    className="
      absolute inset-x-0 top-1/2 -translate-y-1/2
      h-52
      bg-gradient-to-r
      from-[#FCE7F3]/50 via-[#E0F2FE]/50 to-[#FEF3C7]/50
      blur-[90px]
      opacity-80
      pointer-events-none
    "
  />

  {/* EYEBROW */}
  <p className="relative text-[11px] uppercase tracking-[0.45em] text-gray-500 mb-6">
    A Quiet Space For Ideas
  </p>

  {/* MAIN TITLE */}
  <h1
    className="
      relative
      text-6xl md:text-7xl
      font-serif
      text-sumu-charcoal
      leading-none
      tracking-tight
      mb-4
    "
  >
    Journal
  </h1>

  {/* SHADOW TITLE (DEPTH LAYER) */}
  <h1
    className="
      absolute inset-x-0 top-[58%]
      text-6xl md:text-7xl
      font-serif
      text-sumu-charcoal/5
      blur-sm
      -z-10
    "
  >
    Journal
  </h1>

  {/* SUBTEXT */}
  <p className="relative mt-6 text-gray-500 max-w-xl mx-auto leading-relaxed">
    Insights on design, craftsmanship, and culture.
  </p>

</div>


        {/* ===== BLOG GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {content.blogPosts.map((post, index) => {
            const ref = React.useRef<HTMLDivElement | null>(null);
            const [visible, setVisible] = React.useState(false);

            React.useEffect(() => {
              if (!ref.current) return;

              const observer = new IntersectionObserver(
                ([entry]) => {
                  if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                  }
                },
                { threshold: 0.2 }
              );

              observer.observe(ref.current);
              return () => observer.disconnect();
            }, []);

            return (
              <article
                key={post.id}
                ref={ref}
                className={`group transition-all duration-[1200ms] ease-out
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
                `}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* GLASS CARD */}
                <div
                  className="
                    relative overflow-hidden
                    bg-white/30 backdrop-blur-2xl
                    shadow-[0_40px_90px_rgba(0,0,0,0.12)]
                    transition-all duration-700
                    hover:-translate-y-3
                    min-h-[620px]        /* ⭐ SAME HEIGHT */
                    flex flex-col        /* ⭐ SAME HEIGHT */
                  "
                >
                  {/* GRADIENT AURORA */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-br
                      from-[#FCE7F3]/60 via-[#E0F2FE]/40 to-[#FEF3C7]/60
                      opacity-70
                      pointer-events-none
                    "
                  />

                  {/* IMAGE */}
                  <div className="relative h-[320px] overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="
                        w-full h-full object-cover
                        transition-transform duration-[1800ms] ease-out
                        group-hover:scale-[1.06]
                      "
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="relative p-10 flex flex-col flex-grow">
                    <span className="block text-xs uppercase tracking-[0.35em] text-gray-500 mb-2">
                      {post.date}
                    </span>

                    <h2 className="text-2xl md:text-3xl font-serif text-sumu-charcoal mb-4 leading-tight">
                      {post.title}
                    </h2>

                    <p className="text-gray-700 leading-[1.8] mb-8 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* READ LINK (ALIGNED BOTTOM) */}
                    <span
                      className="
                        inline-block text-xs uppercase tracking-[0.35em]
                        text-sumu-charcoal relative mt-auto
                        after:absolute after:left-0 after:-bottom-2
                        after:w-full after:h-px after:bg-sumu-charcoal
                        after:scale-x-0 after:origin-left
                        group-hover:after:scale-x-100
                        after:transition-transform after:duration-500
                      "
                    >
                      Read Article
                    </span>
                  </div>

                  {/* SOFT GLOW */}
                  <div className="
                    absolute inset-0
                    opacity-0 group-hover:opacity-100
                    transition duration-700
                    bg-gradient-to-br from-white/20 via-transparent to-white/20
                    pointer-events-none
                  " />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
