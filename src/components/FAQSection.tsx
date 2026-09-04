import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  Search,
  MessageSquare,
  Clock,
  Radio,
  FileCheck,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { FAQ_CATEGORIES, FAQ_ITEMS } from '../config/faqData';
import { COMPANY_INFO } from '../config/solitaData';

interface FAQSectionProps {
  darkMode: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Default first two questions open for instant readability and visual proof
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-timeline-mvp': true,
    'faq-comm-channels': true
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredItems = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const qLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      item.question.toLowerCase().includes(qLower) ||
      item.answer.toLowerCase().includes(qLower) ||
      item.highlights?.some((h) => h.toLowerCase().includes(qLower));

    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'timelines':
        return <Clock className="w-4 h-4 text-amber-400" />;
      case 'communication':
        return <Radio className="w-4 h-4 text-sky-400" />;
      case 'engagement':
        return <FileCheck className="w-4 h-4 text-indigo-400" />;
      case 'ownership':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      default:
        return <HelpCircle className="w-4 h-4 text-indigo-400" />;
    }
  };

  const scrollToContact = () => {
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className={`py-24 border-t transition-colors ${
        darkMode ? 'bg-[#080808] border-zinc-800/80' : 'bg-white border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-indigo-500 text-[11px] font-bold uppercase tracking-[0.3em]">
                Client Inquiries
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                Direct Clarity & Terms
              </span>
            </div>

            <h2
              id="faq-heading"
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
                darkMode ? 'text-white' : 'text-zinc-950'
              }`}
            >
              Frequently Asked Questions
            </h2>

            <p className={`text-base sm:text-lg leading-relaxed ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Transparent answers regarding delivery timelines, engineering communication, flexible engagement structures, and 100% intellectual property transfer.
            </p>
          </div>

          {/* Search Filter Box */}
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                id="faq-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search timelines, contracts, IP..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-full border text-xs font-mono transition-all focus:outline-none focus:ring-1 ${
                  darkMode
                    ? 'bg-zinc-900/40 border-zinc-800 text-white placeholder-zinc-500 focus:border-indigo-500 focus:ring-indigo-500'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-indigo-600 focus:ring-indigo-600'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 overflow-x-auto">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`faq-filter-btn-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : darkMode
                      ? 'bg-zinc-900/40 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-300'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 max-w-4xl">
          {filteredItems.length === 0 ? (
            <div className={`p-10 rounded-3xl border text-center space-y-3 ${
              darkMode ? 'bg-zinc-900/20 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-600'
            }`}>
              <HelpCircle className="w-8 h-8 mx-auto text-zinc-500" />
              <div className="text-base font-bold text-zinc-200">No matching questions found</div>
              <p className="text-xs font-mono max-w-md mx-auto">
                No items matched "{searchQuery}". Try clearing your search or switching to another category tab.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-mono uppercase tracking-wider font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isOpen = !!openItems[item.id];
              return (
                <div
                  key={item.id}
                  id={`faq-card-${item.id}`}
                  className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? darkMode
                        ? 'bg-zinc-900/40 border-zinc-700 shadow-lg shadow-black/40'
                        : 'bg-white border-zinc-300 shadow-md'
                      : darkMode
                        ? 'bg-zinc-900/20 border-zinc-800 hover:border-zinc-700/80'
                        : 'bg-[#FAFAFA] border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <button
                    id={`faq-trigger-${item.id}`}
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 font-bold flex items-center gap-1.5">
                          {getCategoryIcon(item.category)}
                          <span>{item.categoryLabel}</span>
                        </span>
                        <span className="text-xs font-mono text-zinc-500">
                          Q{index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </span>
                      </div>

                      <h3 className={`text-base sm:text-lg font-bold tracking-tight pr-4 ${
                        darkMode ? 'text-zinc-100' : 'text-zinc-900'
                      }`}>
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-180 bg-indigo-600 border-indigo-500 text-white'
                          : darkMode
                            ? 'border-zinc-800 bg-zinc-900 text-zinc-400'
                            : 'border-zinc-200 bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${item.id}`}
                      className={`px-6 sm:px-7 pb-7 pt-1 border-t transition-all ${
                        darkMode ? 'border-zinc-800/60 text-zinc-300' : 'border-zinc-100 text-zinc-700'
                      }`}
                    >
                      <p className="text-sm sm:text-base leading-relaxed mb-5 font-normal">
                        {item.answer}
                      </p>

                      {item.highlights && item.highlights.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-zinc-800/40">
                          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
                            Key Standard Guarantees:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.highlights.map((highlight, hIdx) => (
                              <div
                                key={hIdx}
                                className={`p-2.5 rounded-xl border flex items-start gap-2 text-xs font-mono ${
                                  darkMode
                                    ? 'bg-zinc-950/60 border-zinc-800 text-zinc-300'
                                    : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                                }`}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Callout: Custom Inquiries or Unique Requirements */}
        <div className={`mt-16 p-8 sm:p-10 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
          darkMode
            ? 'bg-zinc-900/30 border-zinc-800 shadow-xl shadow-black/40'
            : 'bg-zinc-50 border-zinc-200 shadow-xs'
        }`}>
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-indigo-400 text-[10px] font-mono uppercase tracking-[0.25em] font-bold">
                Direct Engineering Access
              </span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${
              darkMode ? 'text-white' : 'text-zinc-950'
            }`}>
              Have a tailored timeline or bespoke technical requirement?
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed font-mono ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Speak directly with our technical lead to discuss architecture feasibility, sprint estimations, or custom IP protection agreements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              id="faq-contact-cta-btn"
              onClick={scrollToContact}
              className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
            >
              <span>Discuss Your Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <a
              id="faq-whatsapp-cta-link"
              href={`https://wa.me/${COMPANY_INFO.contact.whatsappNumber}?text=${encodeURIComponent('Hi Solita Solutions, I have a specific question regarding project timelines and engagement models.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-3 rounded-full border text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                darkMode
                  ? 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white hover:border-zinc-700'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:text-zinc-950 hover:border-zinc-300'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
