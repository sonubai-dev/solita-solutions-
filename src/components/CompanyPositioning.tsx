import React from 'react';
import { ArrowDown, Layers, Wrench, ShieldCheck, Sparkles, Building2, Terminal } from 'lucide-react';
import { COMPANY_INFO } from '../config/solitaData';

interface CompanyPositioningProps {
  darkMode: boolean;
}

export const CompanyPositioning: React.FC<CompanyPositioningProps> = ({ darkMode }) => {
  return (
    <section
      id="positioning"
      aria-label="Company Positioning and Architecture"
      className={`py-20 border-y ${
        darkMode ? 'bg-[#080808] border-zinc-800/80' : 'bg-[#FAFAFA] border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-indigo-500 text-[11px] font-bold uppercase tracking-[0.3em]">
              Parent Technology Studio
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Corporate Model
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-zinc-950'
          }`}>
            One Company. Multiple Technology Ventures.
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed ${
            darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            {COMPANY_INFO.corePositioning}
          </p>
        </div>

        {/* The Two Major Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Pillar 1: Technology Products */}
          <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
            darkMode
              ? 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 shadow-lg'
              : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-indigo-400">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Pillar 01
              </span>
            </div>

            <h3 className={`text-2xl font-bold mb-3 tracking-tight ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
              1. Technology Products
            </h3>
            
            <p className={`text-sm sm:text-base leading-relaxed mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Solita Solutions invents, funds, and develops proprietary software products. We engineer tools that automate complex visual, multimedia, and image workflows for users and creators globally.
            </p>

            <div className={`pt-4 border-t ${darkMode ? 'border-zinc-800/80' : 'border-zinc-100'} space-y-2`}>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                <span>Active Flagships: Vistaro AI & SplitPro</span>
              </div>
              <div className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                100% internally owned, architected, and continuously evolved.
              </div>
            </div>
          </div>

          {/* Pillar 2: Business Technology Services */}
          <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
            darkMode
              ? 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 shadow-lg'
              : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-indigo-400">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Pillar 02
              </span>
            </div>

            <h3 className={`text-2xl font-bold mb-3 tracking-tight ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
              2. Business Technology Services
            </h3>
            
            <p className={`text-sm sm:text-base leading-relaxed mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              We extend our battle-tested engineering, AI capabilities, and systems architecture to modern businesses. We transform manual operational friction into intelligent, automated digital systems.
            </p>

            <div className={`pt-4 border-t ${darkMode ? 'border-zinc-800/80' : 'border-zinc-100'} space-y-2`}>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                <span>AI Agents • WhatsApp Automation • Full-Stack Systems</span>
              </div>
              <div className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                We don't just build websites. We engineer end-to-end business systems.
              </div>
            </div>
          </div>

        </div>

        {/* Visual Company Structure Hierarchy Diagram */}
        <div className={`p-6 sm:p-10 rounded-3xl border ${
          darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
        }`}>
          <div className="text-center mb-8">
            <h3 className={`text-lg font-bold tracking-tight ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
              Corporate Structure Architecture
            </h3>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mt-1">
              Solita Solutions Multi-Venture Parent Hierarchy
            </p>
          </div>

          <div className="flex flex-col items-center max-w-4xl mx-auto space-y-6">
            
            {/* Level 1: Parent Technology Company */}
            <div className="w-full max-w-md p-5 rounded-2xl bg-zinc-900 text-white text-center border border-zinc-700 shadow-xl">
              <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-400 font-bold">Parent Technology Company</span>
              <h4 className="text-xl font-black tracking-tight mt-0.5">SOLITA SOLUTIONS</h4>
              <p className="text-xs text-zinc-400 mt-1">Intelligent digital products & business technology solutions</p>
            </div>

            {/* Connecting Arrow */}
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-zinc-700"></div>
              <ArrowDown className="w-3.5 h-3.5 text-indigo-400 -mt-1" />
            </div>

            {/* Level 2: Products & Services Branches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              
              {/* Products Branch */}
              <div className={`p-5 rounded-2xl border ${
                darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-800">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-indigo-400">
                    Proprietary Products
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className={`p-3 rounded-xl border ${
                    darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Vistaro AI</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Live</span>
                    </div>
                    <span className={`text-xs block mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      AI Visual Content & Image-to-Video Platform
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl border ${
                    darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>SplitPro</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Live</span>
                    </div>
                    <span className={`text-xs block mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      Image Processing & Precision Grid Workflow Utility
                    </span>
                  </div>
                </div>
              </div>

              {/* Services Branch */}
              <div className={`p-5 rounded-2xl border ${
                darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-800">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-indigo-400">
                    Business Technology Services
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`p-2.5 rounded-xl border ${darkMode ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700'}`}>
                    <span className="font-bold text-indigo-400 block mb-0.5">AI Solutions</span>
                    <span>Agents & Automations</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${darkMode ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700'}`}>
                    <span className="font-bold text-indigo-400 block mb-0.5">Automation</span>
                    <span>WhatsApp & CRMs</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${darkMode ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700'}`}>
                    <span className="font-bold text-indigo-400 block mb-0.5">Software Dev</span>
                    <span>Custom Web & SaaS</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${darkMode ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700'}`}>
                    <span className="font-bold text-indigo-400 block mb-0.5">Business Systems</span>
                    <span>Dashboards & APIs</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
