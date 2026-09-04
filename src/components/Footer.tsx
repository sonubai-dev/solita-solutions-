import React from 'react';
import { Cpu, MessageCircle, Phone, Mail, ArrowUpRight, Lock, ExternalLink, Github, FileText, Sparkles } from 'lucide-react';
import { COMPANY_INFO, VISTARO_AI_URL, SPLITPRO_URL, FOUNDER_RESUME_URL, FOUNDER_GITHUB_URL } from '../config/solitaData';

interface FooterProps {
  darkMode: boolean;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ darkMode, onOpenLegal, onOpenAdmin }) => {
  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="main-footer"
      className={`border-t transition-colors ${
        darkMode ? 'bg-[#050505] border-zinc-800 text-zinc-400' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Positioning Statement (Section 27) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                <Cpu className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-white font-mono">
                SOLITA SOLUTIONS
              </span>
            </div>

            <p className="text-sm font-medium text-zinc-200 max-w-md">
              Building technology for the next generation of businesses.
            </p>

            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              Independent technology company & AI product studio building proprietary software, automated digital systems, and enterprise technology solutions.
            </p>

            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-indigo-400 pt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              <span>Founder-led technology studio</span>
            </div>
          </div>

          {/* Quick Navigation (Section 27) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 font-bold">
              Navigation
            </div>
            <ul className="space-y-2 text-xs uppercase tracking-wider font-mono">
              <li>
                <button
                  onClick={() => scrollTo('#products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#why-solita')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Why Solita
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#leadership')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#careers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Products & Founder Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 font-bold">
              Products & Profiles
            </div>

            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a
                  href={SPLITPRO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-zinc-300 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <span>SplitPro</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href={VISTARO_AI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-zinc-300 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <span>Vistaro AI</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                </a>
              </li>
              <li className="pt-2 border-t border-zinc-800/80">
                <a
                  href={FOUNDER_RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-zinc-300 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Founder Resume</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href={FOUNDER_GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-zinc-300 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-indigo-400" />
                    <span>GitHub (@sonubai-dev)</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (Section 27) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 font-bold">
              Direct Contact
            </div>
            
            <ul className="space-y-2.5 text-xs font-mono">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-zinc-500">WhatsApp:</span>
                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsappNumber}?text=${encodeURIComponent(COMPANY_INFO.contact.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  {COMPANY_INFO.contact.whatsappDisplay}
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-zinc-500">Call:</span>
                <a
                  href={`tel:${COMPANY_INFO.contact.phone.replace(/\s+/g, '')}`}
                  className="text-zinc-200 hover:underline"
                >
                  {COMPANY_INFO.contact.phone}
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-zinc-500">Email:</span>
                <a
                  href={`mailto:${COMPANY_INFO.contact.email}`}
                  className="text-zinc-200 hover:underline"
                >
                  {COMPANY_INFO.contact.email}
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-zinc-500">Dev:</span>
                <a
                  href={`mailto:${COMPANY_INFO.contact.devEmail}`}
                  className="text-zinc-200 hover:underline"
                >
                  {COMPANY_INFO.contact.devEmail}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright and Legal Notice (Section 27) */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © 2026 Solita Solutions. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => {
                if (onOpenAdmin) onOpenAdmin();
                else window.location.hash = '#admin';
              }}
              className="hover:text-indigo-400 transition-colors cursor-pointer flex items-center gap-1 text-zinc-400"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Backend</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
