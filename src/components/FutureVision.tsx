import React, { useState, useEffect } from 'react';
import { Compass, Bot, Workflow, Cloud, Terminal, Laptop, Activity, Server, Sparkles } from 'lucide-react';
import { EXPLORING_AREAS } from '../config/solitaData';

interface FutureVisionProps {
  darkMode: boolean;
}

export const FutureVision: React.FC<FutureVisionProps> = ({ darkMode }) => {
  const [activeH3Index, setActiveH3Index] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // 1-second continuous loop animation running through each h3 component
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveH3Index((prev) => (prev + 1) % EXPLORING_AREAS.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Sparkles className="w-5 h-5 text-indigo-400" />;
      case 1: return <Bot className="w-5 h-5 text-violet-400" />;
      case 2: return <Workflow className="w-5 h-5 text-sky-400" />;
      case 3: return <Cloud className="w-5 h-5 text-blue-400" />;
      case 4: return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 5: return <Laptop className="w-5 h-5 text-amber-400" />;
      case 6: return <Activity className="w-5 h-5 text-rose-400" />;
      case 7:
      default: return <Server className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section
      id="future-vision"
      aria-label="What We Are Building Toward"
      className={`py-24 border-t ${
        darkMode ? 'bg-[#080808] border-zinc-800/80' : 'bg-[#FAFAFA] border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-indigo-500 text-[11px] font-bold uppercase tracking-[0.3em]">
              Future Horizon
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Research Pipeline
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-zinc-950'
          }`}>
            What We’re Building Toward
          </h2>

          <div className="space-y-2">
            <p className={`text-lg sm:text-xl font-medium ${
              darkMode ? 'text-indigo-400' : 'text-indigo-600'
            }`}>
              The future of software is intelligent, automated, and deeply connected to how people work.
            </p>
            <p className={`text-base sm:text-lg leading-relaxed ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Solita Solutions aims to build products and systems that make technology more useful, accessible, and practical.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
              Areas we're exploring
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
              <span>1s Loop Animation (0{activeH3Index + 1}/0{EXPLORING_AREAS.length})</span>
            </span>
          </div>
        </div>

        {/* 8 Areas We're Exploring Grid with 1s Loop Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXPLORING_AREAS.map((area, idx) => {
            const isLoopActive = idx === activeH3Index;
            return (
              <div
                key={area.name}
                id={`future-card-${idx}`}
                onMouseEnter={() => {
                  setIsPaused(true);
                  setActiveH3Index(idx);
                }}
                onMouseLeave={() => setIsPaused(false)}
                className={`p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
                  isLoopActive
                    ? darkMode
                      ? 'bg-zinc-900/80 border-indigo-500/80 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/40 -translate-y-1'
                      : 'bg-indigo-50/50 border-indigo-400 shadow-md ring-1 ring-indigo-300 -translate-y-1'
                    : darkMode
                      ? 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700'
                      : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
                }`}
              >
                {/* Active tracer glow for current loop item */}
                {isLoopActive && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse" />
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-all duration-300 ${
                    isLoopActive
                      ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-400 scale-105'
                      : 'bg-zinc-800 border-zinc-700'
                  }`}>
                    {getIcon(idx)}
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest font-bold transition-colors ${
                    isLoopActive ? 'text-indigo-400 font-extrabold' : 'text-zinc-500'
                  }`}>
                    0{idx + 1}
                  </span>
                </div>

                <h3
                  id={`future-h3-${idx}`}
                  className={`text-base font-bold mb-2 tracking-tight transition-all duration-300 flex items-center justify-between ${
                    isLoopActive
                      ? 'text-indigo-400 translate-x-1 font-extrabold scale-[1.02]'
                      : darkMode
                        ? 'text-white'
                        : 'text-zinc-950'
                  }`}
                >
                  <span className="relative">
                    {area.name}
                    {isLoopActive && (
                      <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-500 rounded-full animate-pulse" />
                    )}
                  </span>
                  {isLoopActive && (
                    <span className="inline-flex items-center ml-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                    </span>
                  )}
                </h3>

                <p className={`text-xs leading-relaxed transition-colors ${
                  isLoopActive
                    ? darkMode ? 'text-zinc-300' : 'text-zinc-800'
                    : darkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                  {area.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Clarification footnote */}
        <div className="mt-8 text-center">
          <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            * Exploratory research & active technology prototyping pipeline. Solita Solutions actively benchmarks new model capabilities for production systems.
          </p>
        </div>

      </div>
    </section>
  );
};
