import React, { useState } from 'react';
import { Briefcase, ArrowUpRight, Mail, Sparkles, Code, CheckCircle } from 'lucide-react';
import { CAREER_ROLES, COMPANY_INFO } from '../config/solitaData';
import { CareerRole } from '../types';

interface HiringSectionProps {
  darkMode: boolean;
}

export const HiringSection: React.FC<HiringSectionProps> = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Engineering', 'Automation', 'Mobile', 'Design', 'Product & Growth'];

  const filteredRoles = selectedCategory === 'All'
    ? CAREER_ROLES
    : CAREER_ROLES.filter(r => r.category === selectedCategory);

  const mailtoSubject = encodeURIComponent("Job Application — Solita Solutions");
  const baseMailto = `mailto:${COMPANY_INFO.contact.email}?subject=${mailtoSubject}`;

  return (
    <section
      id="careers"
      aria-label="Careers and Opportunities"
      className={`py-24 ${darkMode ? 'bg-[#080808]' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-indigo-500 text-[11px] font-bold uppercase tracking-[0.3em]">
              Studio Opportunities
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Talent Network
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-zinc-950'
          }`}>
            Build the Future With Us.
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed ${
            darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            We’re looking for curious builders, engineers, designers, AI practitioners, and problem solvers who want to work on real products and emerging technology.
          </p>

          {/* Mandatory Label from Section 13 */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono uppercase tracking-widest font-bold bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Current / Upcoming Opportunities</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest transition-colors cursor-pointer font-semibold ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : darkMode
                    ? 'bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                    : 'bg-zinc-100 border border-zinc-200 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {filteredRoles.map((role) => (
            <div
              key={role.title}
              className={`p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                darkMode
                  ? 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700'
                  : 'bg-[#FAFAFA] border-zinc-200 hover:border-zinc-300 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                    {role.category}
                  </span>
                  <span className={`text-[10px] font-mono uppercase ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    {role.location}
                  </span>
                </div>

                <h3 className={`text-lg font-bold tracking-tight mb-2 ${
                  darkMode ? 'text-white' : 'text-zinc-950'
                }`}>
                  {role.title}
                </h3>

                <p className={`text-xs leading-relaxed mb-6 ${
                  darkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                  {role.description}
                </p>
              </div>

              <div className={`pt-4 border-t flex items-center justify-between ${
                darkMode ? 'border-zinc-800' : 'border-zinc-200'
              }`}>
                <span className={`text-[10px] font-mono uppercase ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  {role.type}
                </span>

                <a
                  href={`mailto:${COMPANY_INFO.contact.email}?subject=${encodeURIComponent(`Job Application: ${role.title} — Solita Solutions`)}`}
                  className="text-xs font-mono uppercase tracking-wider font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Apply</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Primary CTA Block (Section 13) */}
        <div className={`rounded-3xl border p-8 sm:p-10 text-center max-w-3xl mx-auto ${
          darkMode
            ? 'bg-zinc-900/30 border-zinc-800'
            : 'bg-white border-zinc-200 shadow-sm'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 text-indigo-400 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5" />
          </div>

          <h3 className={`text-2xl font-bold tracking-tight mb-2 ${
            darkMode ? 'text-white' : 'text-zinc-950'
          }`}>
            Don't see an exact match?
          </h3>

          <p className={`text-sm leading-relaxed max-w-xl mx-auto mb-6 ${
            darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            Send us your portfolio, GitHub, or an overview of the hardest technical challenge you've conquered.
          </p>

          <a
            id="join-solita-cta-btn"
            href={baseMailto}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-[11px] uppercase tracking-widest rounded-full shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Join Solita</span>
          </a>

          <div className="mt-3 text-[11px] font-mono text-zinc-500">
            Direct inquiries: {COMPANY_INFO.contact.email}
          </div>
        </div>

      </div>
    </section>
  );
};
