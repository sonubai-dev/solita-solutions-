import React, { useState } from 'react';
import { Bot, Zap, Code, Smartphone, Layers, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { SERVICES_DATA } from '../config/solitaData';
import { ServiceCategory } from '../types';

interface ServiceSectionProps {
  darkMode: boolean;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({ darkMode }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES_DATA[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-5 h-5 text-indigo-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Code':
        return <Code className="w-5 h-5 text-sky-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'Layers':
      default:
        return <Layers className="w-5 h-5 text-violet-400" />;
    }
  };

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      aria-label="Services and Solutions"
      className={`py-24 border-t ${
        darkMode ? 'bg-[#080808] border-zinc-800/80' : 'bg-zinc-50 border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Strong Service Positioning (Section 6 & 7) */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-indigo-500 text-[11px] font-bold uppercase tracking-[0.3em]">
              Engineering & Solutions
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Enterprise Systems
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight ${
            darkMode ? 'text-white' : 'text-zinc-950'
          }`}>
            Technology Solutions for Businesses
          </h2>

          <div className="space-y-2">
            <blockquote className={`text-xl sm:text-2xl font-bold tracking-tight ${
              darkMode ? 'text-zinc-200' : 'text-zinc-900'
            }`}>
              “We don't just build websites. We build systems.”
            </blockquote>

            <p className={`text-base sm:text-lg leading-relaxed ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              From AI automation to custom software, Solita Solutions helps businesses turn manual processes into intelligent digital assets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              id="services-build-with-solita-btn"
              onClick={scrollToContact}
              className="px-7 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm shadow-indigo-600/20 cursor-pointer"
            >
              <span>Build With Solita</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              id="services-talk-to-us-btn"
              onClick={scrollToContact}
              className={`px-7 py-3 rounded-full font-bold text-[11px] uppercase tracking-widest border transition-all flex items-center gap-2 cursor-pointer ${
                darkMode
                  ? 'border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:text-white hover:bg-zinc-800'
                  : 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              <span>Talk to Us</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                darkMode
                  ? 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700'
                  : 'bg-white border-zinc-200 hover:border-zinc-400 hover:shadow-md'
              }`}
            >
              <div>
                {/* Header with Icon and Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl border shrink-0 ${
                    darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
                  }`}>
                    {getIcon(service.iconName)}
                  </div>
                  <h3 className={`text-xl font-bold tracking-tight ${
                    darkMode ? 'text-white' : 'text-zinc-900'
                  }`}>
                    {service.title}
                  </h3>
                </div>

                <p className={`text-sm leading-relaxed mb-6 ${
                  darkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                  {service.shortDesc}
                </p>

                {/* Sub-services checklist */}
                <div className="space-y-2 mb-6">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                    Included Capabilities
                  </div>
                  <div className="space-y-1.5">
                    {service.services.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0"></div>
                        <span className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical capability badge */}
              <div className={`pt-4 border-t ${darkMode ? 'border-zinc-800/80' : 'border-zinc-100'}`}>
                <span className={`text-[11px] block leading-normal ${
                  darkMode ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  <strong className="text-indigo-400 font-mono">Architecture: </strong>
                  {service.systemCapability}
                </span>
              </div>
            </div>
          ))}

          {/* Quick Consultation Callout Card */}
          <div className={`p-6 sm:p-7 rounded-2xl border flex flex-col justify-between ${
            darkMode
              ? 'bg-zinc-900/40 border-indigo-500/30'
              : 'bg-indigo-50/50 border-indigo-200'
          }`}>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4 font-bold">
                Custom Systems Architecture
              </div>
              <h3 className={`text-xl font-bold tracking-tight mb-2 ${
                darkMode ? 'text-white' : 'text-zinc-900'
              }`}>
                Need a Custom Engineered Solution?
              </h3>
              <p className={`text-sm leading-relaxed mb-6 ${
                darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                Whether you need intelligent WhatsApp automation, custom AI agents, or end-to-end CRM pipelines, our engineering team builds purpose-tailored solutions.
              </p>
            </div>

            <button
              type="button"
              id="services-start-custom-project-btn"
              onClick={scrollToContact}
              className="w-full py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-[11px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-600/20"
            >
              <span>Build With Solita</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
