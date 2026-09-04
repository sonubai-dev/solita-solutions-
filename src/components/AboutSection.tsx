import React from 'react';
import { Terminal, Shield, CheckCircle2, Building, Cpu, Layers } from 'lucide-react';
import { COMPANY_INFO } from '../config/solitaData';

interface AboutSectionProps {
  darkMode: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ darkMode }) => {
  return (
    <section
      id="about"
      aria-label="About Solita Solutions"
      className={`py-24 border-y ${
        darkMode ? 'bg-[#080808] border-zinc-800/80' : 'bg-[#FAFAFA] border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission & Exact Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="text-indigo-500 text-[11px] font-bold uppercase tracking-[0.3em]">
                About Solita
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                Studio Charter
              </span>
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight ${
              darkMode ? 'text-white' : 'text-zinc-950'
            }`}>
              We’re Building the Technology Company We Want to Use.
            </h2>

            <div className={`space-y-4 text-base sm:text-lg leading-relaxed ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              <p>
                Solita Solutions is an independent technology company focused on AI, software, automation, and digital products.
              </p>
              <p>
                We build our own products, experiment with emerging technologies, and work with businesses to develop practical digital systems.
              </p>
              <p className="font-semibold text-indigo-400">
                Our approach is simple: identify a real problem, build a useful solution, and continuously improve it.
              </p>
            </div>

            {/* Core Operating Tenants */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-5 rounded-3xl border transition-all ${
                darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
              }`}>
                <div className="flex items-center gap-2 text-indigo-400 text-[11px] font-mono uppercase tracking-wider font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Independent & Focused</span>
                </div>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Free from speculative bloat, focused squarely on shipping useful, high-craft software.
                </p>
              </div>

              <div className={`p-5 rounded-3xl border transition-all ${
                darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
              }`}>
                <div className="flex items-center gap-2 text-indigo-400 text-[11px] font-mono uppercase tracking-wider font-bold mb-2">
                  <Cpu className="w-4 h-4" />
                  <span>Modern Tech Stack</span>
                </div>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Leveraging modern AI models, full-stack TypeScript, and cloud-native automation pipelines.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech Studio Manifest */}
          <div className="lg:col-span-5">
            <div className={`p-8 rounded-3xl border ${
              darkMode ? 'bg-zinc-900/30 border-zinc-800 shadow-xl' : 'bg-white border-zinc-200 shadow-md'
            }`}>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
                <span className="text-[11px] font-mono text-indigo-400 font-bold tracking-[0.2em] uppercase">
                  Studio Principles
                </span>
                <span className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  EST. 2026
                </span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Real User Problems",
                    desc: "We prioritize solutions addressing actual operational pain points over theoretical features."
                  },
                  {
                    title: "Continuous Refinement",
                    desc: "Software is an evolving craft. We iterate rapidly based on measurable performance."
                  },
                  {
                    title: "Pragmatic AI",
                    desc: "We deploy AI where it reliably reduces human labor and increases output velocity."
                  }
                ].map((item, idx) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <span className="w-7 h-7 rounded-xl bg-zinc-800 border border-zinc-700 text-indigo-400 text-xs font-mono flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className={`text-sm font-bold tracking-tight ${darkMode ? 'text-zinc-200' : 'text-zinc-900'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs leading-relaxed mt-0.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`mt-6 pt-5 border-t ${darkMode ? 'border-zinc-800' : 'border-zinc-200'} text-[11px] font-mono uppercase tracking-widest text-center text-zinc-500`}>
                Solita Solutions • Technology & Product Studio
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
