import React from 'react';
import { UserCheck, Shield, Sparkles, FileText, Github, ExternalLink } from 'lucide-react';
import { LEADERSHIP_TEAM } from '../config/solitaData';

interface LeadershipSectionProps {
  darkMode: boolean;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ darkMode }) => {
  return (
    <section
      id="leadership"
      aria-label="Leadership Section"
      className={`py-24 ${darkMode ? 'bg-[#080808]' : 'bg-[#FAFAFA]'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-indigo-500 text-[11px] font-bold uppercase tracking-[0.3em]">
              Executive Leadership
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Studio Direction
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-zinc-950'
          }`}>
            Leadership
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed ${
            darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            The team directing Solita Solutions, guiding proprietary product development and business technology execution.
          </p>
        </div>

        {/* Leadership Profile Cards (Section 10) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {LEADERSHIP_TEAM.map((leader) => (
            <div
              key={leader.name}
              id={`leader-card-${leader.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                darkMode
                  ? 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 shadow-xl shadow-black/20'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
              }`}
            >
              <div>
                {/* Clean portrait representation */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-lg tracking-wider text-indigo-400 font-mono">
                    {leader.imagePlaceholderText}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold tracking-tight ${
                      darkMode ? 'text-white' : 'text-zinc-950'
                    }`}>
                      {leader.name}
                    </h3>
                    <div className="inline-block text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full mt-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                      {leader.role}
                    </div>
                  </div>
                </div>

                {/* Bio text directly as mandated */}
                <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
                  darkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                  {leader.bio}
                </p>
              </div>

              {/* Focus tags */}
              <div className={`pt-4 border-t ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] mb-2 text-zinc-500 font-bold">
                  Areas of Focus:
                </div>
                <div className="flex flex-wrap gap-2">
                  {leader.focus.map((item) => (
                    <span
                      key={item}
                      className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border font-bold ${
                        darkMode
                          ? 'bg-zinc-800/80 border-zinc-700 text-zinc-300'
                          : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Direct Founder Links */}
                {(leader.resumeUrl || leader.githubUrl) && (
                  <div className="mt-5 pt-4 border-t border-dashed border-zinc-800/80 flex flex-wrap items-center gap-2.5">
                    {leader.resumeUrl && (
                      <a
                        href={leader.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-indigo-600/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-all group"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Founder Resume</span>
                        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    )}
                    {leader.githubUrl && (
                      <a
                        href={leader.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border transition-all ${
                          darkMode
                            ? 'bg-zinc-800/60 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                            : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200'
                        }`}
                      >
                        <Github className="w-3.5 h-3.5 text-indigo-400" />
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Note on Founder-led culture */}
        <div className="mt-12 text-center">
          <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            Solita Solutions is a founder-led technology company committed to transparent engineering and real-world utility.
          </p>
        </div>

      </div>
    </section>
  );
};
