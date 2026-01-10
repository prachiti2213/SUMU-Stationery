import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { PageRoute } from '../types';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { content } = useContent();
  const product = content.products.find((p) => p.id === id);

  if (!product) {
    return <Navigate to={PageRoute.PRODUCTS} />;
  }

  return (
    <div className="bg-white min-h-screen fade-in pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link to={PageRoute.PRODUCTS} className="inline-flex items-center text-gray-500 hover:text-sumu-wood transition-colors text-sm font-semibold uppercase tracking-widest">
            <ArrowLeft size={16} className="mr-2" /> Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Section */}
          <div className="relative aspect-square bg-gray-50 border border-gray-100 p-8">
             <img 
               src={product.imageUrl} 
               alt={product.name} 
               className="w-full h-full object-contain mix-blend-multiply"
             />
             <div className="absolute top-0 right-0 p-6">
                <span className="text-xs font-bold text-white bg-sumu-wood px-3 py-1 uppercase tracking-widest">Premium</span>
             </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center">
             <div className="flex justify-between items-start mb-4">
               <h4 className="text-sm font-bold text-sumu-wood uppercase tracking-[0.2em]">
                 {product.category}
               </h4>
               {product.price && (
                 <span className="text-xl font-serif text-sumu-charcoal font-medium">
                   {product.price}
                 </span>
               )}
             </div>
             <h1 className="text-4xl md:text-5xl font-serif text-sumu-charcoal mb-6">
               {product.name}
             </h1>
             <p className="text-lg text-gray-600 leading-relaxed mb-8 border-b border-gray-100 pb-8">
               {product.description}
             </p>

             <div className="space-y-6 mb-10">
               <div>
                 <h5 className="text-sm font-bold text-sumu-charcoal uppercase tracking-wide mb-2">Specifications</h5>
                 <p className="text-gray-500">{product.specifications}</p>
               </div>
               <div>
                 <h5 className="text-sm font-bold text-sumu-charcoal uppercase tracking-wide mb-2">Ideal For</h5>
                 <p className="text-gray-500">{product.useCase}</p>
               </div>
             </div>
             
             <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to={PageRoute.CONTACT} 
                  className="flex-1 bg-sumu-charcoal text-white text-center py-4 text-sm font-bold uppercase tracking-widest hover:bg-sumu-wood transition-colors"
                >
                  Request Quote
                </Link>
                <div className="flex-1 border border-gray-200 text-center py-4 text-sm font-bold text-gray-500 uppercase tracking-widest">
                  Bulk Order Available
                </div>
             </div>

             {/* Assurance */}
             <div className="mt-8 flex items-center space-x-6 text-xs text-gray-400 uppercase tracking-wider">
               <span className="flex items-center"><CheckCircle size={14} className="mr-2 text-green-500" /> Sustainable Wood</span>
               <span className="flex items-center"><CheckCircle size={14} className="mr-2 text-green-500" /> Non-Toxic</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};