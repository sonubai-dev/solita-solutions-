import React from 'react';
import { Target, Cpu, Wrench, TrendingUp, GitMerge, Clock } from 'lucide-react';
import { WHY_SOLITA_POINTS } from '../config/solitaData';

interface WhySolitaProps {
  darkMode: boolean;
}

export const WhySolita: React.FC<WhySolitaProps> = ({ darkMode }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'product-mindset':
        return <Target className="w-5 h-5 text-indigo-400" />;
      case 'ai-first':
        return <Cpu className="w-5 h-5 text-violet-400" />;
      case 'engineering-focus':
        return <Wrench className="w-5 h-5 text-sky-400" />;
      case 'business-driven':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'product-plus-services':
        return <GitMerge className="w-5 h-5 text-amber-400" />;
      case 'long-term-thinking':
      default:
        return <Clock className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section
      id="why-solita"
      aria-label="Why Solita Solutions"
      className={`py-24 ${darkMode ? 'bg-[#080808]' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-indigo-500 text-[11px] font-bold uppercase tracking-[0.3em]">
              Engineering Principles
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              The Studio Distinction
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-zinc-950'
          }`}>
            Why Solita Solutions?
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed ${
            darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            We bridge the discipline of building proprietary consumer & commercial products with the practical rigor of enterprise systems engineering.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_SOLITA_POINTS.map((point) => (
            <div
              key={point.id}
              id={`why-point-${point.id}`}
              className={`p-7 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                darkMode
                  ? 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700'
                  : 'bg-[#FAFAFA] border-zinc-200 hover:border-zinc-300 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                    {getIcon(point.id)}
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border font-bold ${
                    darkMode
                      ? 'bg-zinc-800/80 border-zinc-700 text-zinc-300'
                      : 'bg-white border-zinc-200 text-zinc-700 shadow-xs'
                  }`}>
                    {point.badge}
                  </span>
                </div>

                <h3 className={`text-lg sm:text-xl font-bold tracking-tight mb-2 ${
                  darkMode ? 'text-white' : 'text-zinc-950'
                }`}>
                  {point.title}
                </h3>

                <p className={`text-xs sm:text-sm leading-relaxed ${
                  darkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
