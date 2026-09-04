import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Layers, Cpu, Code2, Bot, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../config/solitaData';

interface HeroProps {
  darkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  const rotatingWords = ['Technology', 'AI Systems', 'Automation', 'Intelligent Apps', 'Digital Platforms'];
  const [activeWordIdx, setActiveWordIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWordIdx((prev) => (prev + 1) % rotatingWords.length);
    }, 1000);
    return () => clearInterval(timer);
  }, [rotatingWords.length]);

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ecosystemNodes = [
    { label: 'AI', icon: Bot, color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-500/10' },
    { label: 'Products', icon: Layers, color: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/10' },
    { label: 'Automation', icon: Sparkles, color: 'text-sky-400', border: 'border-sky-500/30', bg: 'bg-sky-500/10' },
    { label: 'Software', icon: Code2, color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10' },
    { label: 'Business', icon: Cpu, color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' }
  ];

  return (
    <section
      id="home"
      aria-label="Hero Section"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* Subtle Background Grid & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] ${
            darkMode ? 'opacity-25' : 'opacity-40'
          }`}
        />
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-indigo-600/10 via-violet-600/5 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Positioning & Brand Messaging */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Tag Badge: Editorial Uppercase Tracking */}
            <div className="flex items-center space-x-2">
              <span className="text-indigo-500 text-[11px] font-bold uppercase tracking-[0.3em]">
                AI Product Studio
              </span>
              <span className="text-zinc-600">•</span>
              <span className={`text-[11px] font-mono uppercase tracking-widest ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Founder-Led Engineering
              </span>
            </div>

            {/* Primary Headline with Editorial Dual-Tone Contrast & 1s Loop Animation */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              <span className={darkMode ? 'text-white' : 'text-zinc-950'}>
                Building{' '}
                <span
                  key={activeWordIdx}
                  className={`inline-block transition-all duration-300 font-extrabold animate-pulse ${
                    darkMode
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-400'
                      : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700'
                  }`}
                >
                  {rotatingWords[activeWordIdx]}
                </span>{' '}
                That Moves Businesses Forward.
              </span>
            </h1>

            {/* Subheadline & Company Positioning */}
            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              {COMPANY_INFO.subheadline}
            </p>

            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl font-light border-l-2 pl-4 italic ${
              darkMode ? 'border-indigo-500/50 text-zinc-400' : 'border-indigo-600/40 text-zinc-600'
            }`}>
              "{COMPANY_INFO.corePositioning}"
            </p>

            {/* Action Buttons: Editorial Pill Styling */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                id="hero-explore-products-btn"
                onClick={() => scrollTo('#products')}
                className="w-full sm:w-auto px-7 py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-[11px] uppercase tracking-widest rounded-full shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-work-with-us-btn"
                onClick={() => scrollTo('#contact')}
                className={`w-full sm:w-auto px-7 py-3 font-bold text-[11px] uppercase tracking-widest rounded-full border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  darkMode
                    ? 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-zinc-300 hover:text-white'
                    : 'border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800 shadow-sm'
                }`}
              >
                <span>Work With Us</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Editorial Metrics */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-zinc-800/80 w-full">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                  Active Model
                </div>
                <div className={`text-sm font-bold mt-1 ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
                  Products + Client Systems
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                  Proprietary Stack
                </div>
                <div className={`text-sm font-bold mt-1 ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
                  Vistaro AI & SplitPro
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                  Delivery Focus
                </div>
                <div className={`text-sm font-bold mt-1 ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
                  Intelligent Automation
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Technical Capabilities & Hub Architecture */}
          <div className="lg:col-span-5 relative">
            <div className={`relative p-6 sm:p-8 rounded-3xl border transition-all ${
              darkMode
                ? 'bg-zinc-900/50 border-zinc-800 shadow-2xl shadow-black/40'
                : 'bg-white border-zinc-200 shadow-xl'
            }`}>
              
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-5 border-b border-zinc-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                  Technical Architecture
                </span>
              </div>

              {/* Central Product & System Hub Diagram */}
              <div className="py-6 relative flex flex-col items-center justify-center">
                {/* Core Hub */}
                <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-800 flex flex-col items-center justify-center text-white p-3 shadow-xl shadow-indigo-600/30 border border-indigo-400/40">
                  <Cpu className="w-7 h-7 mb-1 text-white" />
                  <span className="text-xs font-black tracking-wider">SOLITA</span>
                  <span className="text-[8px] font-mono uppercase text-indigo-200 tracking-widest">CORE LAB</span>
                </div>

                {/* Technical Capabilities Nodes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mt-6">
                  {ecosystemNodes.map((node) => {
                    const IconComponent = node.icon;
                    return (
                      <div
                        key={node.label}
                        className={`p-3 rounded-2xl border flex flex-col items-center text-center transition-all hover:border-zinc-700 ${
                          darkMode ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-zinc-50 border-zinc-200'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5 mb-1">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                          <IconComponent className={`w-3.5 h-3.5 ${node.color}`} />
                        </div>
                        <span className={`text-[12px] font-bold ${darkMode ? 'text-zinc-300' : 'text-zinc-800'}`}>
                          {node.label}
                        </span>
                      </div>
                    );
                  })}
                  <div className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center ${
                    darkMode ? 'border-zinc-800 bg-zinc-900/30 text-zinc-400' : 'border-zinc-200 bg-zinc-100 text-zinc-600'
                  }`}>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Model</span>
                    <span className="text-[12px] font-bold text-indigo-400">Ventures + Client</span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className={`mt-5 w-full p-3 rounded-2xl border text-xs flex items-center justify-between ${
                  darkMode ? 'border-zinc-800/80 bg-black/40 text-zinc-300' : 'border-zinc-200 bg-zinc-50 text-zinc-700'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">Operational</span>
                  </div>
                  <span className="font-mono text-[10px] text-indigo-400 font-bold uppercase tracking-widest">v2.6 Stable</span>
                </div>
              </div>

              {/* Editorial Quote */}
              <div className="pt-4 border-t border-zinc-800/60">
                <p className="text-[12px] italic text-zinc-500 leading-relaxed text-center">
                  "We don't just build websites. We build systems that turn manual processes into intelligent digital assets."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
