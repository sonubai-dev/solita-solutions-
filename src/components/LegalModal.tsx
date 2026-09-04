import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
  darkMode: boolean;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose, darkMode }) => {
  if (!isOpen || !type) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
    >
      <div className={`relative max-w-2xl w-full rounded-3xl border p-6 sm:p-8 max-h-[85vh] overflow-y-auto ${
        darkMode ? 'bg-[#0E0E0E] border-zinc-800 text-zinc-200' : 'bg-white border-zinc-200 text-zinc-800 shadow-2xl'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-full border transition-colors cursor-pointer ${
            darkMode ? 'border-zinc-800 hover:bg-zinc-850 text-zinc-400 hover:text-white' : 'border-zinc-200 hover:bg-zinc-100 text-zinc-600'
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4 text-indigo-400 font-mono text-[10px] uppercase font-bold tracking-[0.2em]">
          {type === 'privacy' ? <Shield className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          <span>Legal & Compliance</span>
        </div>

        <h3 className={`text-2xl font-bold tracking-tight mb-4 ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
          {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
        </h3>

        <div className={`space-y-4 text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {type === 'privacy' ? (
            <>
              <p>
                <strong>Last Updated: September 2026</strong>
              </p>
              <p>
                Solita Solutions ("we", "our", or "the Company") values your privacy. This Privacy Policy explains how we collect, handle, and protect communications and project information submitted to Solita Solutions.
              </p>
              <h4 className="font-bold text-white mt-4">1. Data Collection</h4>
              <p>
                We only collect information voluntarily submitted by you through our website contact forms, WhatsApp communications, or email correspondence (e.g. your name, corporate email address, telephone number, and project specifications).
              </p>
              <h4 className="font-bold text-white mt-4">2. Use of Information</h4>
              <p>
                The information you provide is utilized exclusively for evaluating business inquiries, technical scoping, delivering software engineering services, and maintaining client accounts.
              </p>
              <h4 className="font-bold text-white mt-4">3. Confidentiality</h4>
              <p>
                We do not sell, rent, or trade your personal or corporate data with third-party marketing companies. Project specifications are kept strictly confidential.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Last Updated: September 2026</strong>
              </p>
              <p>
                By accessing this website or engaging Solita Solutions for technology products or development services, you agree to comply with the following terms.
              </p>
              <h4 className="font-bold text-white mt-4">1. Proprietary Rights</h4>
              <p>
                All proprietary products developed by Solita Solutions, including Vistaro AI and SplitPro, along with their respective software architectures, trademarks, and codebases, remain the exclusive property of Solita Solutions.
              </p>
              <h4 className="font-bold text-white mt-4">2. Client Engagements</h4>
              <p>
                Custom business software, AI agents, and automation workflows engineered for clients are governed by explicit statement-of-work (SOW) agreements defining deliverables, milestones, and intellectual property terms.
              </p>
              <h4 className="font-bold text-white mt-4">3. Disclaimer</h4>
              <p>
                This website and its informational materials are provided on an "as is" basis for prospective clients, partners, and applicants.
              </p>
            </>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-zinc-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold uppercase tracking-widest cursor-pointer shadow-sm"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
