
import React from 'react';
import { Product, Language } from '../types';
import { translations } from '../translations';

interface ProductCardProps {
  product: Product;
  language: Language;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, language, onAddToCart }) => {
  const t = translations[language];
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className="relative h-64 overflow-hidden bg-gray-50 p-4">
        <img 
          src={product.image} 
          alt={product.name[language]}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          TSh {product.price.toLocaleString()}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
          {product.category[language]}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
          {product.name[language]}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description[language]}
        </p>
        
        {product.compatibility && product.compatibility.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
            {product.compatibility.map(brand => (
              <span key={brand} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[9px] uppercase font-bold tracking-wider rounded">
                {brand}
              </span>
            ))}
          </div>
        )}
        
        <div className={!product.compatibility ? "mt-auto" : ""}>
          <button 
            onClick={() => onAddToCart(product)}
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {t.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
