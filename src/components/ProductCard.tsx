import React from 'react';
import { ArrowUpRight, CheckCircle2, Film, Grid3X3, Sparkles, ExternalLink, Info } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductCardProps {
  product: ProductItem;
  darkMode: boolean;
  onExplore: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, darkMode, onExplore }) => {
  const isVistaro = product.id === 'vistaro-ai';

  return (
    <div
      id={`product-card-${product.id}`}
      className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        darkMode
          ? 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 shadow-xl shadow-black/30'
          : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        <div>
          {/* Card Top: Editorial Category Badge & Version */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded font-bold uppercase tracking-wider border border-indigo-500/20">
              {product.category}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono tracking-wider">
              {product.id === 'vistaro-ai' ? 'v1.0.4' : 'v2.2.0'} • {product.status}
            </span>
          </div>

          {/* Product Name & Icon */}
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 ${
              isVistaro ? 'bg-indigo-600' : 'bg-zinc-800 border border-zinc-700'
            }`}>
              {isVistaro ? <Film className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
            </div>
            <h3 className={`text-2xl font-bold tracking-tight ${
              darkMode ? 'text-white' : 'text-zinc-900'
            }`}>
              {product.name}
            </h3>
          </div>

          {/* Tagline */}
          <p className="text-xs font-semibold text-indigo-400 mb-3 tracking-wide">
            {product.tagline}
          </p>

          {/* Description */}
          <p className={`text-sm leading-relaxed mb-6 ${
            darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            {product.description}
          </p>

          {/* Target Applications Pills */}
          <div className="space-y-2 mb-6">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              Target Applications
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.useCases.slice(0, 4).map((useCase) => (
                <span
                  key={useCase}
                  className={`text-[11px] px-2.5 py-0.5 rounded-full border ${
                    darkMode
                      ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
                      : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                  }`}
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions: Editorial Pill Buttons */}
        <div className={`pt-5 border-t flex items-center gap-3 ${
          darkMode ? 'border-zinc-800/80' : 'border-zinc-200'
        }`}>
          <a
            id={`launch-${product.id}-link`}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-[11px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 shadow-sm shadow-indigo-600/20 cursor-pointer group"
          >
            <span>{product.ctaText}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <button
            type="button"
            id={`details-${product.id}-btn`}
            onClick={() => onExplore(product)}
            title="View Product Specifications & Architecture"
            className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
              darkMode
                ? 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-white hover:bg-zinc-800'
                : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
