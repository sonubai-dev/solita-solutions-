import React, { useState } from 'react';
import { ArrowRight, Sparkles, X, CheckCircle, ExternalLink, Terminal, Shield, Layers } from 'lucide-react';
import { PRODUCTS_DATA, VISTARO_AI_URL, SPLITPRO_URL } from '../config/solitaData';
import { ProductCard } from './ProductCard';
import { ProductItem } from '../types';

interface ProductSectionProps {
  darkMode: boolean;
}

export const ProductSection: React.FC<ProductSectionProps> = ({ darkMode }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [experimentsModalOpen, setExperimentsModalOpen] = useState(false);

  return (
    <section
      id="products"
      aria-label="Products Section"
      className={`py-24 border-t ${
        darkMode ? 'bg-[#080808] border-zinc-800/80' : 'bg-white border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Editorial Typography */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-indigo-500 text-[11px] font-bold uppercase tracking-[0.3em]">
              Proprietary Software
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Active Portfolio
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight ${
            darkMode ? 'text-white' : 'text-zinc-950'
          }`}>
            Products We’re Building
          </h2>

          <p className={`text-lg sm:text-xl font-normal mt-3 ${
            darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            Technology products designed to solve real problems.
          </p>

          <p className={`text-sm mt-2 max-w-2xl ${
            darkMode ? 'text-zinc-500' : 'text-zinc-500'
          }`}>
            Solita Solutions develops and owns its own software products, applying rigorous engineering and modern AI directly into everyday workflows.
          </p>
        </div>

        {/* Highlighted Products Cards: Vistaro AI & SplitPro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {PRODUCTS_DATA.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              darkMode={darkMode}
              onExplore={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </div>

        {/* Product 3 Card: More Products. More Experiments. (Section 4 & 5) */}
        <div
          id="future-products-card"
          className={`rounded-3xl border p-8 sm:p-10 transition-all ${
            darkMode
              ? 'bg-zinc-900/30 border-zinc-800 shadow-xl'
              : 'bg-zinc-50 border-zinc-200 shadow-sm'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-400 font-bold">
                  Lab & Pipeline
                </span>
              </div>

              <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                darkMode ? 'text-white' : 'text-zinc-950'
              }`}>
                More Products. More Experiments.
              </h3>

              <p className={`text-sm sm:text-base leading-relaxed ${
                darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                Solita Solutions is continuously experimenting with AI, automation, developer tools, productivity software, and emerging technologies.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {['AI Workflow Engines', 'Automation Connectors', 'Lightweight Developer Utilities', 'Focused Productivity Tools'].map((item) => (
                  <span
                    key={item}
                    className={`text-[11px] px-3 py-1 rounded-full border ${
                      darkMode
                        ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
                        : 'bg-white border-zinc-200 text-zinc-700'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <button
                type="button"
                id="view-our-products-btn"
                onClick={() => setExperimentsModalOpen(true)}
                className="px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-[11px] uppercase tracking-widest border border-zinc-700 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>View Our Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono uppercase tracking-widest mt-2 text-zinc-500">
                Continuous engineering pipeline
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Product Detail Modal for Vistaro AI / SplitPro */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
        >
          <div className={`relative max-w-2xl w-full rounded-3xl border p-6 sm:p-8 max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-[#080808] border-zinc-800 text-zinc-100 shadow-2xl' : 'bg-white border-zinc-200 text-zinc-900 shadow-2xl'
          }`}>
            <button
              onClick={() => setSelectedProduct(null)}
              className={`absolute top-5 right-5 p-2 rounded-full border transition-colors cursor-pointer ${
                darkMode ? 'border-zinc-800 hover:bg-zinc-800 text-zinc-400' : 'border-zinc-200 hover:bg-zinc-100 text-zinc-600'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                {selectedProduct.category}
              </span>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                Status: {selectedProduct.status}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
              {selectedProduct.name}
            </h3>

            <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {selectedProduct.description}
            </p>

            <div className="mb-6">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-400 mb-3 font-bold">
                Core Use Cases & Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProduct.useCases.map((uc) => (
                  <div key={uc} className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                    darkMode ? 'bg-zinc-900/50 border-zinc-800 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                  }`}>
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{uc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="mb-6">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-400 mb-3 font-bold">
                Engineering Highlights
              </h4>
              <ul className="space-y-1.5 text-xs">
                {selectedProduct.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <span className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Configurable URL info notice */}
            <div className={`p-3.5 rounded-2xl border text-xs font-mono mb-6 ${
              darkMode ? 'bg-zinc-900/50 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-600'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-indigo-400 font-semibold">Live Production Target:</span>
                <span className="text-emerald-400 font-bold">Online</span>
              </div>
              <a
                href={selectedProduct.url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-indigo-400 hover:underline flex items-center gap-1 mt-1 font-bold"
              >
                <span>{selectedProduct.url}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800/80">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className={`px-5 py-2 text-[11px] uppercase tracking-widest font-bold rounded-full border ${
                  darkMode ? 'border-zinc-800 hover:bg-zinc-800 text-zinc-300' : 'border-zinc-200 hover:bg-zinc-100 text-zinc-700'
                }`}
              >
                Close
              </button>
              <a
                href={selectedProduct.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 text-[11px] uppercase tracking-widest font-bold rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <span>Launch {selectedProduct.name}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Experiments & Pipeline Modal */}
      {experimentsModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
        >
          <div className={`relative max-w-xl w-full rounded-3xl border p-6 sm:p-8 ${
            darkMode ? 'bg-[#080808] border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
          }`}>
            <button
              onClick={() => setExperimentsModalOpen(false)}
              className={`absolute top-5 right-5 p-2 rounded-full border transition-colors cursor-pointer ${
                darkMode ? 'border-zinc-800 hover:bg-zinc-800 text-zinc-400' : 'border-zinc-200 hover:bg-zinc-100 text-zinc-600'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Product Studio Roadmap
            </span>

            <h3 className="text-2xl font-bold mt-3 mb-2 tracking-tight">
              Current & Future Products
            </h3>

            <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Solita Solutions is an active technology company. Our current highlighted products are <strong>Vistaro AI</strong> and <strong>SplitPro</strong>. Our internal engineering teams continuously prototype tools in:
            </p>

            <div className="space-y-2 mb-6">
              {[
                { name: "AI Visual & Multimedia Processing", note: "Powering dynamic image and video rendering" },
                { name: "High-Speed Productivity & Grid Utilities", note: "Optimizing media preparation workflows" },
                { name: "Autonomous Business Agents", note: "Multi-channel automated operations" },
                { name: "Developer Acceleration Systems", note: "Lightweight, reliable engineering utilities" }
              ].map((exp) => (
                <div key={exp.name} className={`p-3 rounded-2xl border text-xs ${
                  darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <div className="font-bold text-indigo-400">{exp.name}</div>
                  <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>{exp.note}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-zinc-800/80">
              <button
                type="button"
                onClick={() => setExperimentsModalOpen(false)}
                className="px-6 py-2.5 text-[11px] uppercase tracking-widest font-bold rounded-full bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
