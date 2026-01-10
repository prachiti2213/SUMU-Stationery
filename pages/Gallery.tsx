import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageRoute, GalleryImage } from '../types';

export const Gallery = () => {
  const { content } = useContent();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  /* ================= CATEGORY → PRODUCT ================= */
  const getRecommendedProduct = (category: string) => {
    if (category === 'Student')
      return content.products.find(p => p.name.includes('Scholar')) || content.products[3];

    if (category === 'Corporate')
      return content.products.find(p => p.name.includes('Heritage')) || content.products[2];

    if (category === 'Lifestyle' || category === 'Artist')
      return content.products.find(p => p.name.includes('Polychrome')) || content.products[1];

    return content.products.find(p => p.name.includes('Graphite')) || content.products[0];
  };

  /* ================= CATEGORY → LEFT IMAGE ================= */
  const getContextImageByCategory = (category: string) => {
    switch (category) {
      case 'Student':
        return '/student-context.jpeg';
      case 'Corporate':
        return '/corporate-context.jpeg';
      case 'Lifestyle':
      case 'Artist':
        return '/artist-context.jpeg';
      default:
        return '/sumuheritage.jpeg';
    }
  };

  const selectedProduct = selectedImage
    ? getRecommendedProduct(selectedImage.category)
    : null;

  return (
    <div className="bg-white min-h-screen py-20 relative">

      {/* ================= ANIMATIONS ================= */}
      <style>{`
        @keyframes slideFromLeft {
          from { opacity: 0; transform: translateX(-80px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideFromRight {
          from { opacity: 0; transform: translateX(80px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes windowOpen {
          from { opacity: 0; transform: scaleX(0); }
          to { opacity: 1; transform: scaleX(1); }
        }
      `}</style>

      <section className="relative mb-22 py-15 sm:py-12">
        <div className="text-left sm:text-center px-8">
          <h1 className="text-4xl md:text-6xl uppercase tracking-[0.32em]">
            {"Visual Journal".split("").map((char, i) => (
              <span
                key={i}
                className="inline-block transition-transform duration-[1200ms]
                           hover:-translate-y-[2px]"
                style={{
                  fontFamily: `"Playfair Display", Georgia, serif`,
                  textShadow: "0 5px 14px rgba(0,0,0,0.25)"
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>
      </section>

      {/* ================= GALLERY GRID ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-1 md:columns-2 lg:columns-3
                        gap-6 sm:gap-8
                        space-y-6 sm:space-y-8">

          {content.gallery.map((image, index) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="break-inside-avoid group relative overflow-hidden cursor-pointer
                         border border-gray-200 rounded-lg opacity-0"
              style={{
                animation: `${
                  index % 2 === 0 ? 'slideFromLeft' : 'slideFromRight'
                } 0.9s cubic-bezier(0.16,1,0.3,1) forwards`,
                animationDelay: `${index * 140}ms`
              }}
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full object-cover transition-transform duration-700
                           group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-sumu-charcoal/60 opacity-0
                              group-hover:opacity-100 transition-opacity duration-300
                              flex items-center justify-center">
                <div className="text-center text-white p-4
                                transform translate-y-4 group-hover:translate-y-0
                                transition-transform duration-300">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2 text-sumu-wood">
                    {image.category}
                  </p>
                  <p className="font-serif text-xl italic">
                    {image.caption}
                  </p>
                  <span className="inline-block mt-4 text-[10px] uppercase tracking-wider
                                   border border-white px-3 py-1">
                    View Product
                  </span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedImage && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">

          <div
            className="absolute inset-0 bg-sumu-charcoal/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          />

          <div
            className="bg-white w-full max-w-5xl
                       h-[90vh] sm:h-[80vh] md:h-[600px]
                       relative z-10 flex flex-col md:flex-row shadow-2xl
                       overflow-y-auto md:overflow-hidden
                       origin-center
                       animate-[windowOpen_0.55s_ease-out]"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 text-gray-500
                         hover:text-sumu-charcoal p-2 bg-white/80 rounded-full"
            >
              <X size={24} />
            </button>

            {/* LEFT */}
            <div className="w-full md:w-1/2
                            h-[40%] sm:h-1/2 md:h-full
                            relative">
              <img
                src={getContextImageByCategory(selectedImage.category)}
                alt={selectedImage.category}
                className="w-full h-full object-cover"
              />
            </div>

            {/* RIGHT */}
            <div className="w-full md:w-1/2
                            h-[60%] sm:h-1/2 md:h-full
                            p-6 sm:p-8 md:p-12
                            flex flex-col justify-center bg-sumu-stone">
              <div className="text-center">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-48 h-48 md:w-64 md:h-64 object-cover mx-auto
                             rounded-full shadow-xl mb-6 border-4 border-white"
                />
                <h2 className="text-3xl md:text-4xl font-serif text-sumu-charcoal mb-2">
                  {selectedProduct.name.replace(/^SUMU\s+/, '')}
                </h2>
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-6">
                  {selectedProduct.category}
                </p>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
                  {selectedProduct.description}
                </p>

                <Link
                  to={PageRoute.PRODUCTS}
                  className="inline-flex items-center bg-sumu-wood text-white
                             px-8 py-3 text-sm font-semibold tracking-widest uppercase
                             hover:bg-sumu-charcoal transition-colors"
                >
                  View Details <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
